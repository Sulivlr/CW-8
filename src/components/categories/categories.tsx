import {NavLink} from 'react-router-dom';
import {categories} from '../../constants';

const Categories = () => {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <NavLink to="/">All</NavLink>
      </li>
      {
        categories.map(category => {
          return (
            <li className="nav-item" key={category.id}>
              <NavLink className="nav-link" aria-current="page" to={"/quotes/" + category.id}>{category.title}</NavLink>
            </li>
          );
        })
      }

    </ul>
  );
};

export default Categories;