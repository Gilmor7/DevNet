import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const HeaderSocial = ({ s, link }) => (
    <Link className="text-white p-2" to={link} target="_blank">
        <i className={`fab fa-${s} fa-2x`} />
    </Link>
)

HeaderSocial.propTypes = {
    s: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default HeaderSocial;
