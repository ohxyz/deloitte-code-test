import React, { Component } from 'react';

class LaunchList extends Component {

    renderSubtitle( launch, pads ) {

        let date = launch.launch_date_local.slice(0,10);
        let time = launch.launch_date_local.slice(11,19);
        let pad = pads.filter( p => p.id === launch.launch_site.site_id )[0].full_name;

        return (
            <div className="launch__subtitle">
                Launched on <span className="bold">{date}</span> at <span className="bold">{time}</span> from <span className="bold">{pad}</span>
            </div>
        );
    }

    formatLink( name ) {

        if ( name === 'reddit_campaign' )       return 'Reddit Campaign';
        else if ( name === 'reddit_launch' )    return 'Reddit Launch';
        else if ( name === 'reddit_recovery' )  return 'Reddit Recovery';
        else if ( name === 'reddit_media' )     return 'Reddit Media';
        else if ( name === 'presskit' )         return 'Press';
        else if ( name === 'article_link' )     return 'Artical';
        else if ( name === 'video_link' )       return 'Video';
        else                                    return '';
    }

    render() {

        return (
            <div aria-live="polite" className="launch__list">
                <div className="launch__summary">
                {   this.props.launches.length > 0
                    ? <span>Showing { this.props.launches.length } Missions</span>
                    : <span role="alert">No results found.</span>
                }
                </div>
                {
                    this.props.launches.map( (l, index)  => 

                        <div className="launch__item" key={index}>
                            <div className="launch__pic">
                                <img alt="A launch mission" src={ l.links.mission_patch } />
                            </div>
                            <div className="launch__main">
                                <div className="launch__title">
                                    <span className="launch__rocket-name">
                                        { l.rocket.rocket_name }
                                    </span>
                                    <span> - </span>
                                    {
                                        l.payloads.map( (p, index) => 

                                            <span className="launch__payload-id" key={index}>
                                                { p.payload_id }
                                            </span>
                                        )
                                    }
                                    {
                                        ( !l.launch_success || !l.land_success ) 
                                            && <span className="launch__failure">- Failed Mission</span>
                                    }
                                </div>
                                <div className="launch__subtitle">
                                    { this.renderSubtitle( l, this.props.pads ) }
                                </div>
                                <div className="launch__footer">
                                {
                                    Object.keys( l.links ).map( name => {

                                        if ( name === 'mission_patch' ) return null;

                                        return (
                                            <a className="link" 
                                               rel="noopener noreferrer" 
                                               key={name} 
                                               target="_blank" 
                                               href={ l.links[name] || '' }
                                            >
                                                { this.formatLink(name) }
                                            </a>
                                        )
                                    } )
                                }
                                </div>
                            </div>
                            <div className="launch__flight-number flight">
                                <div className="flight__number">{ '# ' + l.flight_number }</div>
                                <div className="flight__literal">Flight Number</div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export {

    LaunchList
}