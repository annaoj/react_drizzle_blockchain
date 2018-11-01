import React from 'react';
import PropTypes from 'prop-types';
import './KittyInformation.css';

const KittyInformation = ({ 
        kittyGenes,
        kittyGeneration, 
        kittyBirthDate, 
        kittyImageUrl 
    }) => {
        return (
            <div className="resultWrapper" >
                <div className="imgContainer">
                    <img 
                        alt='kitty' 
                        src={kittyImageUrl}
                        className="imgKitty"
                    />
                </div>
                <p><span className="header">Genes:</span> {kittyGenes}</p>
                <p><span className="header">Birthday:</span> {kittyBirthDate}</p>
                <p><span className="header">Generation:</span> {kittyGeneration}</p>
            </div>
        );
    };

KittyInformation.propTypes = {
    kittyGenes: PropTypes.string,
    kittyBirthDate: PropTypes.string,
    kittyGeneration: PropTypes.string,
    kittyImageUrl:PropTypes.string
};

export default KittyInformation;