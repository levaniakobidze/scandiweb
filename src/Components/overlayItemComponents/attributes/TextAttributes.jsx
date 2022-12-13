import React, {PureComponent} from "react";


export default class TextAttributes  extends  PureComponent {
    render(){
        return   (
            <div className='attribute-wrapper'>
                <p className='overlay-attribute-name'>
                    {this.props.attribute.name}:
                </p>
                <div className='attribute'>
                    {this.props.attribute.items.map((item, itemIndex) => {
                        return (
                            <div key={itemIndex}>
                                <div
                                    className={
                                        this.props.selectedAttributes[0][
                                            `${this.props.attribute.name.toLowerCase()}`
                                            ] !== undefined &&
                                        this.props.selectedAttributes[0][
                                            `${this.props.attribute.name.toLowerCase()}`
                                            ] === item.value
                                            ? "overlay-cart-item-text-cont overlay-cart-item-text-cont-active "
                                            : "overlay-cart-item-text-cont"
                                    }>
                                    {item.displayValue}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
