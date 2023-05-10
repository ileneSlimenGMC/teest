import React from 'react' // we need this to make JSX compile
import { Avatar, ConfigProvider, Menu } from "antd";
import type { MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import styles from './Navbar.module.css'

type MenuItem = Required<MenuProps>['items'][number];
type link = {
  href: string,
  label: string,
  icon?: React.ReactNode,
  key: React.Key,
 }
 
 type text = {
   label: string,
   icon?: React.ReactNode,
   key: React.Key,
 }
 
 type menu = {
   label: string,
   icon?: React.ReactNode
   items: (link | text | menu)[],
   key: React.Key,
 }

const x: INavBarProps={
  menuItems: [{label:"girfer",key:'4'}, {label:"gi",key:'2'},
   {items: [ {label:"girfer",key:'3'},{label:"gi",key:'5'}], label:'test',key:'7'},
   {items: [ {label:"teeest",key:'14'},{label:"tesssssst",key:'15'}], label:'x',key:'11'}]
}
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const transformMenu = (menu: menu | link | text, arr: MenuProps['items']): MenuProps['items'] => {
 
  if( arr!==undefined&& "items" in menu) {
    const result: MenuProps['items'] = [...arr]
    
    const subMenu: MenuProps['items'] = []

 menu.items.forEach(deepMenu => {
        if("items" in deepMenu) {
          subMenu.push(getItem(menu.label, menu.key, menu.icon, transformMenu(deepMenu, subMenu)))
        }
        else {
          subMenu.push(getItem(deepMenu.label, deepMenu.key, deepMenu.icon))

        }
      })

      result.push(getItem(menu.label, menu.label, menu.icon, subMenu))
      return result
      // result.push(getItem(menu.label, menu.label, menu.icon, transformMenu(menu, subMenu)))
    
  }}

  
const transformNavBar =(items: (link | text | menu)[]) :MenuProps['items']=>{

 
    let result: MenuProps['items'] = []
    let transformMenuResult: MenuProps['items'] = []
for (let i=0; i< items.length;i++){
 if (result !== undefined && transformMenuResult!==undefined ){
 
// else   result.push(getItem(items[i].label, items[i].label, items[i].icon))

 if( "items" in items[i]){

  transformMenuResult=transformMenu(items[i],[])
  
 }

 else result.push(getItem(items[i].label, items[i].label, items[i].icon))
}

}

if (transformMenuResult!==undefined){
  return [...result,...transformMenuResult]
}
return result

}





const items: MenuProps['items'] = [

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
]

export interface INavBarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menuItems: (link | text | menu)[]
}

const color='#00b96b'
const Navbar: React.FunctionComponent<INavBarProps> = ({menuItems  }) => 
 {
 

 return (

 <div className={styles.container}>

<div className={styles.leftSection} > 
  <img className={styles.image} alt='logo'  src="https://gomycodelearn.blob.core.windows.net/assets/images/general/gomycodeLogo.svg"/>

  <div className={styles.menu} >
    <div className={styles.firstItemMenu} >Home</div>
    <div className={styles.itemMenu}  >Home</div>
  </div>
  </div>


  <div className={styles.rightSection} >
  <ConfigProvider
  theme={{
    token: {
      colorPrimary: "#8A8E92" ,
   
      colorFillSecondary	:'none',

      colorPrimaryBg:'none',
      controlHeight: 45,
      lineType:'none'


    },
  }}
>

  <Menu
     
     className={styles.userDropdown}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={transformNavBar(x.menuItems)}
    />
    </ConfigProvider>
  </div>
</div>

)
}
export default Navbar
