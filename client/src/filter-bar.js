import React, { PureComponent } from 'react';

const LAUNCH_PAD = 'launch-pad';
const MIN_YEAR = 'min-year';
const MAX_YEAR = 'max-year';

class FilterBar extends PureComponent {

    constructor( props ) {

        super( props );
 
        this.filter = {

            keywords: '',
            minYear: '',
            maxYear: '',
            launchPad: ''
        };
    }

    handleClick() {

        if ( parseInt( this.filter.minYear ) > parseInt( this.filter.maxYear ) ) {

            window.alert( 'Min year must not be greater than max year.' );
        }
        else {

            this.props.onApply( this.filter );
        }
    }

    handleDropdownChange( event, name ) {

        let value = event.target.value;

        if ( name === LAUNCH_PAD ) {

            this.filter.launchPad = value;
        }
        else if ( name === MIN_YEAR ) {

            this.filter.minYear = value;
        }
        else if ( name === MAX_YEAR ) {

            this.filter.maxYear = value;
        }
    }

    renderDropdown( items, name ) {

        return (

            <select className={ 'filter-bar__' + name } onChange={ event => { this.handleDropdownChange( event, name ) } } >
                <option value="">Any</option>
                {
                    items.map( (item, index) => {

                        if ( typeof item === 'string' ) {

                            return <option value={ item } key={ index }>{ item }</option> 
                        }
                        else if ( typeof item === 'object' ) {

                            return <option value={ item.id } key={ item.id }>{ item.name }</option>
                        }
                        else {

                            return null;
                        }

                    } )
                }
            </select>
        )
    }

    getFilterValues( launches ) {

        let values = { pads: [], years: [] };
        let padIds = [];

        for ( let i = 0; i < launches.length; i ++ ) {

            let launch = launches[i];
            let year = launch.launch_date_local.slice(0,4);
            let padId = launch.launch_site.site_id;
            let padName = launch.launch_site.site_name;

            if ( padIds.includes( padId ) === false ) {

                padIds.push( padId );
                values.pads.push( { id: padId, name: padName } );
            }

            if ( values.years.includes( year) === false ) {

                values.years.push( year );
            }
        }

        return values;
    }

    render() {

        let years, pads;

        ( { years, pads } = this.getFilterValues( this.props.launches ) );

        return (
            <div className="filter-bar">
                <div className="filter-bar__item filter-bar__item--keywords">
                    <label>Keywords</label>
                    <input type="text" 
                           placeholder="eg Falcon" 
                           className="filter-bar__keywords" 
                           onChange={ event => this.filter.keywords = event.target.value.trim() } 
                    />
                </div>
                <div className="filter-bar__item filter-bar__item--launch-pad">
                    <label>Launch Pad</label>
                    { this.renderDropdown( pads, LAUNCH_PAD ) }
                </div>
                <div className="filter-bar__item filter-bar__item--min-year">
                    <label>Min Year</label>
                    { this.renderDropdown( years, MIN_YEAR ) }
                </div>
                <div className="filter-bar__item filter-bar__item--max-year">
                    <label>Max Year</label>
                    { this.renderDropdown( years, MAX_YEAR ) }
                </div>
                <div className="filter-bar__item filter-bar__item--button">
                    <span className="filter-bar__button" onClick={ this.handleClick.bind(this) }>Apply</span>
                </div>
            </div>
        );
    }
}

export {

    FilterBar
}