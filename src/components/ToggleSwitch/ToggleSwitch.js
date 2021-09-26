import React, { useState } from "react";
import cn from 'classnames';

function ToggleSwitch(props) {

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className={'toggle-switch__checkbox'}
                name="tumbler"
                id="toggleSwitch"
                value={props.isActive.tumbler}
                onChange={props.handleChange}
            />
            <label className="toggle-switch__label">Короткометражки</label>
        </div>
    );
}

export default ToggleSwitch;
