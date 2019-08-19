import React from 'react';
import PropTypes from 'prop-types';


const HeaderSocial = ({ s, link }) => (
    <a className="text-white p-2" href={link} target="_blank">
        <i className={`fab fa-${s} fa-2x`} />
    </a>
)

HeaderSocial.propTypes = {
    s: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default HeaderSocial;
