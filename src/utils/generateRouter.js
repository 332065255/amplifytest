// {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
//自动生成pages目录下router

const fs = require('fs');
let outRoute = `[`;
function findRouter(src,child=false){
    let dirls = fs.readdirSync(src);
    let str = '';
    
    dirls.map((data) => {
        let tempChild = ''
        let stat = fs.statSync(`${src}/${data}`);
        if (stat && stat.isDirectory()) {
            let name = null;
            try {
                name = fs.readFileSync(`${src}/${data}/.titleName`, {
                    encoding: 'utf8'
                });
            } catch (error) {
                // console.log(error);
            }
            try{
                let temp = fs.statSync(`${src}/${data}/pages`);
                if(temp&& temp.isDirectory()){
                    tempChild+=findRouter(`${src}/${data}/pages`,true);
                }
            } catch(err){

            }
            
            str+=`{
                path:"${child?"":"/"}${data}",
                name: "${data}",
                component: () =>
                     import(/* webpackChunkName: "${data}" */ "${src}/${data}/index.vue"),
                children:[${tempChild}],
            },`
        }
    });
    return str;
}
outRoute=`export default [${findRouter(`${process.cwd()}/src/pages`)}]`;
// console.log(outRoute)
fs.writeFileSync(`${process.cwd()}/src/router/auto.js`, outRoute);

