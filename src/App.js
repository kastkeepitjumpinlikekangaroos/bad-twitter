import React from 'react';
import './App.css';

const BASE_URL = 'http://localhost:8080';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTweets: [],
            view: 'login',
            user: null,
            usernameInput: '',
            tweetInput: ''
        }
    }


    render() {
        return (
            <div>
                {this.header()}
                <div className='container'>
                    {this.body()}
                </div>
            </div>
        )
    }

    header = () => (
        <div className='header'>
            <h1>Welcome to bad-twitter {this.state.user || ''}</h1>
        </div>
    );

    body = () => {
        const {view, allTweets} = this.state;
        console.log(allTweets);
        if (view === 'login')
            return this.loginScreen();

        if (view === 'viewing')
            return this.browsingTweetsScreen();

        if (view === 'tweeting')
            return this.sendTweetScreen();
    };

    loginScreen = () => (
        <form onSubmit={this.login}>
            <h1>Username:</h1>
            <input
                className='text-input'
                type="text"
                name="username"
                value={this.state.usernameInput}
                onChange={e => this.setState({usernameInput: e.target.value})}
            />
            <br/>
            <br/>
            <br/>
            <input className='button' type="submit" value="Submit"/>
        </form>
    );

    browsingTweetsScreen = () => (
        <div>
            {this.displayTweets()}
            <br/>
            <br/>
            <br/>
            <button
                className='button'
                onClick={e => {
                    e.preventDefault();
                    this.setState({view: 'tweeting'})
                }}>
                Tweet
            </button>
        </div>
    );

    displayTweets = () => {
        const {allTweets} = this.state;
        if (allTweets.length === 0)
            return (
                <div style={{textAlign: 'center'}}>
                    <h1>No tweets to show</h1>
                </div>
            );
        return allTweets.map(tweet => (
            <div className='tweet'>
                <h1 className='tweet__user'>{tweet.user}</h1>
                {tweet.content}
            </div>
        ))
    };


    sendTweetScreen = () => (
        <form onSubmit={this.submitTweet}>
            <h1>Tweet:</h1>
            <input
                className='text-input'
                type="text"
                name="tweet"
                value={this.state.tweetInput}
                onChange={e => this.setState({tweetInput: e.target.value})}
            />
            <br/>
            <br/>
            <br/>
            <input className='button' type="submit" value="Submit"/>
        </form>
    );

    login = (event) => {
        event.preventDefault();
        this.setState({
            user: this.state.usernameInput,
            view: 'viewing'
        });
        this.getAllTweets()
    };

    getAllTweets = () => {
        fetch(BASE_URL + '/getAllTweets')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({allTweets: myJson.allTweets})
            });
    };

    submitTweet = (event) => {
        event.preventDefault();

        fetch(BASE_URL + '/tweet', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: this.state.tweetInput,
                user: this.state.user,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({view: 'viewing', allTweets: data.allTweets, tweetInput: ''})
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
}

export default App;
