import React from 'react'
import {PureComponent} from "react";




export default class ColorAttributes extends PureComponent  {


    render() {
     return (
         <div className='attribute-wrapper' >
             <p className='attribute-name'>{this.props.attribute.name}:</p>
             <div className='attribute'>
                 {this.props.attribute.items.map((attrItem, index) => {
                     return (
                         <div
                             key={index}
                             style={{ background: attrItem.value }}
                             className={
                                 this.props.selectedAttributes[
                                     `${this.props.attribute.name.toLowerCase()}`
                                     ] === attrItem.value
                                     ? "color-cont color-active"
                                     : "color-cont"
                             }
                             onClick={() =>
                                 this.props.handleAttributeClick(attrItem, this.props.attribute)
                             }></div>
                     );
                 })}
             </div>
         </div>
     )
    }


}
