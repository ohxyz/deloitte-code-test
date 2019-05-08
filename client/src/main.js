import React, { Component } from 'react';
import { LaunchList } from './launch-list.js';
import { FilterBar } from './filter-bar.js';

class Main extends Component {

    constructor( props ) {

        super( props );

        this.state = {

            launches: [],
            pads: [],
            containerClass: ''
        };

        this.launches = [];
        this.getLaunches();
    }

    getLaunches() {

        this.props
            .onLoad()
            .then( responses => [ responses[0].json(), responses[1].json() ] )
            .then( data => 

                Promise.all( data ).then( array => {

                    this.launches = array[0].slice()

                    this.setState( { 
                        launches: array[0],
                        pads: array[1]
                    } )
                } )
            )
    }

    handleApply( filter ) {

        let filtered = this.launches.filter( l => {

            let year = parseInt( l.launch_date_local.slice(0,4) )
            let minYear = parseInt( filter.minYear ) || -1;
            let maxYear = parseInt( filter.maxYear ) || 9999;

            return (    l.flight_number.toString() === filter.keywords
                     || l.rocket.rocket_name.includes( filter.keywords ) 
                     || l.payloads.some( p => p.payload_id.includes( filter.keywords ) )

                   ) && (

                     l.launch_site.site_id === filter.launchPad || filter.launchPad === ''

                   ) && (

                     ( year >= minYear ) && ( year <= maxYear )
                   )
        } )

        this.setState( { launches: filtered } );
    }

    scrollToSelector( selector ) {

        window.document.querySelector( selector ).scrollIntoView( { behavior: 'smooth' } );
    }

    renderArrow() {

        return (
            <div className="arrow" onClick={ () => this.scrollToSelector( '.filter-bar' ) }>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 400 400" fill="#ffffff">
                    <polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/>
                </svg>
            </div>
        );
    }

    render() {

        return (
            <div className="container" >
                <header className="header">
                    <div className="header__top">SPACE SAVVY</div>
                    <div className="header__middle">Discover Space Missions</div>
                    <div className="header__bottom">
                       { this.renderArrow() }
                    </div>
                </header>
                <main role="main" className="main">
                    <FilterBar onApply={ this.handleApply.bind(this) } launches={ this.launches } />
                    <LaunchList launches={ this.state.launches } pads={ this.state.pads } />
                    <footer className="footer">
                        <span className="copyright">Copyright 2019</span>
                        <span className="back-to-top"
                              onClick={ () => this.scrollToSelector( '.container' ) }
                        >
                            Back to top
                        </span>
                    </footer>
                </main>
            </div>
        );
    }
}

export {

    Main
}