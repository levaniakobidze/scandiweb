import React from 'react'
import {PureComponent} from "react";




export default class TextAttributes extends PureComponent  {


render(){
    return (
        <div className='attribute-wrapper' >
            <p className='attribute-name'>{this.props.attribute.name}:</p>
            <div className='attribute'>
                {this.props.attribute.items.map((attrItem, index) => {
                    return (
                        <div key={index}>
                            <div
                                className={
                                    this.props.selectedAttributes[
                                        `${this.props.attribute.name.toLowerCase()}`
                                        ] === attrItem.value
                                        ? "text-cont text-cont-active"
                                        : "text-cont"
                                }
                                onClick={() =>
                                    this.props.handleAttributeClick(
                                        attrItem,
                                        this.props.attribute,
                                        this.props.id
                                    )
                                }>
                                {attrItem.displayValue}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

}