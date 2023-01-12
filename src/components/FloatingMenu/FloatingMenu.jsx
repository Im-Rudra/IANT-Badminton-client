import React from 'react';
import useAuth from '../../hooks/useAuth';
import checkAccessiblity from '../../utils/checkAccessiblity';
import FloatingMenuButton from './FloatingMenuButton';

const FloatingMenu = ({ collapse, menuList, onClose }) => {
  const { user } = useAuth();
  return (
    <div
      className={
        (collapse ? '' : 'hidden ') + 'overflow-y-auto p-1 bg-gray-50 rounded dark:bg-gray-800'
      }
    >
      <ul className="space-y-2">
        {menuList?.generalMenuList?.map((menu) => {
          return (
            <li key={menu.url} onClick={onClose}>
              <FloatingMenuButton config={menu} />
            </li>
          );
        })}
        {checkAccessiblity('User') &&
          menuList?.userMenuList?.map((menu) => {
            return (
              <li key={menu.url} onClick={onClose}>
                <FloatingMenuButton config={menu} />
              </li>
            );
          })}
        {checkAccessiblity('Administrator') &&
          menuList?.adminMenuList?.map((menu) => {
            return (
              <li key={menu.url} onClick={onClose}>
                <FloatingMenuButton config={menu} />
              </li>
            );
          })}
        {!user?.id &&
          menuList?.antiUserMenuList?.map((menu) => {
            return (
              <li key={menu.url} onClick={onClose}>
                <FloatingMenuButton config={menu} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default FloatingMenu;
