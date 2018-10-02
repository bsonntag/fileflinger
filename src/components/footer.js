import './footer.css';
import ExternalLink from './links/external-link';
import React from 'react';

const Copyright = () => `© ${new Date().getFullYear()} `;

const Footer = () => (
  <footer className={'Footer'}>
    <small>
      <Copyright />

      <ExternalLink href={'https://bsonntag.me'}>
        {'Benjamim Sonntag'}
      </ExternalLink>
    </small>

    <small>
      {'Powered by '}

      <ExternalLink href={'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API'}>
        {'WebRTC'}
      </ExternalLink>

      {' with '}

      <ExternalLink href={'https://github.com/feross/simple-peer'}>
        {'simple-peer'}
      </ExternalLink>
    </small>
  </footer>
);

export default Footer;
