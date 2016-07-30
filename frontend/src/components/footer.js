import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <span>
        <a href="http://stackoverflow.com/users/6060774/alexi2">
          <img src="http://stackoverflow.com/users/flair/6060774.png?theme=dark"
               width={208}
               height={58}
               alt="profile for alexi2 at Stack Overflow,
               Q&A for professional and enthusiast programmers"
               title="profile for alexi2 at Stack Overflow,
               Q&A for professional and enthusiast programmers" />
        </a>
        <a href="https://github.com/alexi21"><img className="github" src="../../images/github.png"/></a>
        <p className="footer-text">Built and maintained by Alex Karolis</p>
          </span>
      </div>
    );
  }
}

export default Footer;
