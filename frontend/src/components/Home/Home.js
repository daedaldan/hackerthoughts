import React, { Component } from 'react';

import Interests from './Interests/Interests.js';
import Comments from './Comments/Comments.js';

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";


let interests = [
    {"id": 2, "interest": "Cinematography", "owner": "testuser1"},
    {"id": 3, "interest": "Reading", "owner": "testuser1"},
    {"id": 4, "interest": "Travel", "owner": "testuser1"},
    {"id": 5, "interest": "Soccer", "owner": "testuser1"},
    {"id": 6, "interest": "Philosophy", "owner": "testuser1"},
    {"id": 7, "interest": "Biology", "owner": "testuser1"},
    {"id": 8, "interest": "Startups", "owner": "testuser1"},
    {"id": 10, "interest": "Machine Learning" ,"owner": "testuser1"}
];

let comments = [
    {
      "title": "Comment by cs702 in \"AlphaFold: a solution to a 50-year-old grand challenge in biology\"",
      "comment": "Two years ago, after DeepMind submitted its first set of predictions to CASP (Critical Assessment of protein Structure Prediction), Mohammed AlQuraishi, an expert in the field, asked, \"What just happened?\"\nNow that the problem of static protein structure prediction has been <i>solved</i> (prediction errors are below the threshold that is considered acceptable in experimental measurements), we can confidently answer AlQuraishi's question:\nIn hindsight, AlphaFold v1 represented for protein structure prediction in 2018 what AlexNet represented for visual recognition in 2012.",
      "link": "https://news.ycombinator.com/item?id=25255722"
    },
    {
      "title": "Comment by mabbo in \"AlphaFold: a solution to a 50-year-old grand challenge in biology\"",
      "comment": "Sometimes announcements like this are a bit over-the-top. But what really, to me, cements the 'big-deal' of this is the \"Median Free-Modelling Accuracy\" graph half way down the page.\nThis isn't a minor improvement, it's a leap forward.",
      "link":"https://news.ycombinator.com/item?id=25255349"
    },
    {
      "title": "Comment by throwmylifawy in \"‘Tokenized’: Black Workers’ Struggles at Coinbase\"",
      "comment":"Reading through the comments as black person is depressing.\nI am not going to pretend to be the arbiter of truth here, but can we just take a moment to imagine the possibility that racism (specifically against black Americans) is a problem in America in 2020? Is it such a stretch of the imagination? I mean if we can unquestioningly believe that cryptocurrency is viable currency, we can certainly give the benefit of the doubt to the black workers who have abandoned the company.",
      "link":"https://news.ycombinator.com/item?id=25233791"
    }
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      comments: [],
      username: undefined
    };

    this.updateInterests = this.updateInterests.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  componentDidMount() {
    let currentUsername = AuthService.getCurrentUser().username;

    this.setState({
      interests: UserService.getInterests(currentUsername),
      comments: UserService.getComments(currentUsername),
      username: currentUsername
    });

    console.log(this.state.interests);
    console.log(this.state.comments);
  }

  updateInterests() {
    this.setState({
      interests: UserService.getInterests(this.state.username)
    });
  }

  updateComments() {
    this.setState({
      comments: UserService.getComments(this.state.username)
    });
  }

  render() {
    return (
        <div>
          <Interests interests={this.state.interests} updateInterests={this.updateInterests}/>
          <Comments comments={this.state.comments}/>
        </div>
    );
  }
}
