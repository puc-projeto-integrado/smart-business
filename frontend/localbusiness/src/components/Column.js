import React from 'react';

const Column = (props)=>{
    const max = 25;
    let count = 0;
    if(props.categories) {
        console.log(props.categories)
        let categories = props.categories;
        let title, urlCategory;
        return (
            <aside>
                <ul className="column-submenu">
                    {categories.map((item) => {
                        count++;
                        urlCategory = `/category/${item.id}`;
                        title = `Fornecedores de ${item.name}`;
                        return (count < max) ? <li key={item.id}><a href={urlCategory} title={title}><span
                            className="fa fa-check"></span> {item.name}</a></li> : ''
                    })}
                </ul>
            </aside>
        )
    }else{
        return null;
    }
}
  
export default Column;