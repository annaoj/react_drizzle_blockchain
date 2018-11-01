import React from 'react';
import PropTypes from 'prop-types';
import './KittySearchForm.css';

const KittySearchForm = ({ 
        handleSubmit, 
        handleChangeOnIdField, 
        id, 
        generateRandomKitty
    }) => {
        return (
        <div className="searchWrapper" >
            <form className="searchForm" onSubmit={handleSubmit}>
            <input
                className="searcInput"
                type="text"
                value={id}
                placeholder="Enter Kitty ID"
                required
                onChange={handleChangeOnIdField()} />
            <input className="searchBtn" type="submit" value={"Search"}/>
            </form>
            <button className="randomSearchBtn"
                onClick = {generateRandomKitty}>
                Get Random Kitty
                <img 
                    alt="pawIcon" 
                    className="pawImg"  
                    src="https://png.icons8.com/ios/1600/cat-footprint.png" 
                />
            </button>
        </div>
        );
    }

KittySearchForm.propTypes ={
    handleSubmit: PropTypes.func,
    getKittyId: PropTypes.func,
    generateRandomKitty: PropTypes.func,
    id:PropTypes.number
};

export default KittySearchForm;