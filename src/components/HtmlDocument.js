import React, { PropTypes } from "react";

// import { trackingId } from "../../config/shared";
// import ga from "../../components/server/ga";
import { provideContext } from "fluxible/addons";

class HtmlDocument extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    script: [],
    css: []
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  // renderFontLinks() {
  //   if (process.env.LOCAL) return; // process.env.LOCAL

  //   let links = []

  //   const typeSrc = `
  //     (function(d) {
  //       var config = {
  //         kitId: 'lkq5wby',
  //         scriptTimeout: 3000
  //       },
  //       h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  //     })(document);`

  //   links.push(<script dangerouslySetInnerHTML={{__html: typeSrc}} />)
  //   return links;
  // }

  render() {
    const { state, markup, script, css, lang, csrf } = this.props;
    const htmlHead = this.context.getStore("HtmlHeadStore");

    return (
      <html lang={lang}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

          <title>{ htmlHead.getTitle() }</title>

          <meta name="description" content={ htmlHead.getDescription() } />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={ htmlHead.getSiteName() } />
          <meta property="og:title" content={ htmlHead.getTitle() } />
          <meta property="og:description" content={ htmlHead.getDescription() } />
          <meta property="og:url" content={ htmlHead.getCurrentUrl() } />

          { htmlHead.getImages().map(url => <meta property="og:image" content={ url } />) }

          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }

          {null /* this.renderFontLinks() */}

          { null /* trackingId &&
            <script dangerouslySetInnerHTML={{__html: ga.replace("{trackingId}", trackingId)}} />
          */ }

        </head>

        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

          <script dangerouslySetInnerHTML={{__html: state}} />

          { script.map((src, k) => <script key={k} src={src} />) }

        </body>
      </html>
    );
  }
}

HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;
