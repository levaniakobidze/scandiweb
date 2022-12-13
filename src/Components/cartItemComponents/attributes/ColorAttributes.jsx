import React, {PureComponent} from "react";

export default class TextAttributes extends PureComponent  {
    render(){
        return (
            <div className='attribute-wrapper'>
                <p className='attribute-name'>{this.props.attribute.name}:</p>
                <div className='attribute'>
                    {this.props.attribute.items.map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{ background: item.value }}
                                className={
                                    this.props.selectedAttributes[0][
                                        `${this.props.attribute.name.toLowerCase()}`
                                        ] !== undefined &&
                                    this.props.selectedAttributes[0][
                                        `${this.props.attribute.name.toLowerCase()}`
                                        ] === item.value
                                        ? "cart-item-color-cont cart-item-color-active"
                                        : "cart-item-color-cont"
                                }></div>
                        );
                    })}
                </div>
            </div>
        )
    }

}