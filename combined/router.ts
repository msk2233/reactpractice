import express from "express";
let app = express.Router();
app.use(express.static('public'));
import auth from './middlewear/authentication';
import {tk4route} from './controllers/staticgrid_route';
import {tk5route} from './controllers/Grid_With_Calendar_route';
import {tk6route_main,tk6route_detail} from './controllers/resultgrid_route';
import {tk7route_main,tk7route_submit,tk7route} from './controllers/dynemicgrid_route';
import {tk8route_main,tk8route} from './controllers/Searching_route';
import {tk9route_main,tk9route_display} from './controllers/Delimitersearch_route';
import {main,insert,get_state,get_city,update,fetch,insdata,updatedata} from './controllers/job_application_form_route';
// let tk14 = require('./controllers/ajaxform_route.js')
import {tk15route,tk15route_convert} from './controllers/timezone_route'
import {tk16route} from './controllers/jsonplaceholder_route';
import {registerpage,register,activate,getpass,createpass} from './controllers/register';
import {login,login_data,dataforpass,reset} from './controllers/login';
import {forgotpass,dashboard,dynemictable,Javascript_Events,KuKucube,ehya_tamplate,hirex_tamplate,Awan_Hoster_template,err} from './controllers/renderpages_route';

app.get('/', registerpage)
app.post('/reg_data', register)
app.get('/activate_link', activate)
app.get('/password', getpass)
app.post('/create_password', createpass)
app.get('/login', login)
app.get('/forgotpass',forgotpass)
app.get('/forgotpass/check',dataforpass)
app.get('/reset',reset)
app.get('/password/login', login)
app.post('/login_data', login_data)
app.get('/dashboard',auth,dashboard);
app.get('/dashboard/dynemictable',auth,  dynemictable)
app.get('/dashboard/Javascript_Events',auth,  Javascript_Events)
app.get('/dashboard/KuKucube',auth, KuKucube)
app.get('/dashboard/staticgrid', auth, tk4route)
app.get('/dashboard/Grid_With_Calendar', auth, tk5route)
app.get('/dashboard/result', auth,tk6route_main)
app.get('/dashboard/result/detailedresult', auth, tk6route_detail)
app.get('/dashboard/dynemicgrid_main', auth,tk7route_main)
app.post('/dashboard/dynemicgrid_main/submit', tk7route_submit)
app.get('/dashboard/dynemicgrid_main/display', auth,tk7route)
app.get('/dashboard/Searching', auth, tk8route_main)
app.post('/dashboard/Searching/Searched_data', auth,tk8route)
app.get('/dashboard/Delimitersearch', auth, tk9route_main)
app.post('/dashboard/Delimitersearch/Delimitersearch_output', auth, tk9route_display)
app.get('/dashboard/ehya_tamplate', ehya_tamplate)
app.get('/dashboard/Awan_Hoster_template', Awan_Hoster_template)
app.get('/dashboard/hirex_tamplate', hirex_tamplate)
app.get('/dashboard/job_application_form', auth, main)
app.get('/dashboard/job_application_form_main/newform', auth, insert)
app.post('/dashboard/job_application_form_main/post_data', auth, insdata)
app.get('/dashboard/job_application_form_main/updateform', auth, update)
app.get('/fetch', auth, fetch)
app.post('/dashboard/job_application_form_main/update', auth, updatedata)
app.get('/dashboard/job_application_form_main/get_state', auth, get_state);
app.get('/dashboard/job_application_form_main/get_city', auth, get_city);
app.get('/dashboard/timezone',auth,tk15route);
app.get('/dashboard/timezone/converted_timezone',auth, tk15route_convert);
app.get('/dashboard/jsonplaceholder', auth, tk16route);
app.get('*',err);
module.exports = app;