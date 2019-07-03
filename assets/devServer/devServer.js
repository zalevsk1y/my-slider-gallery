const path = require("path");
const bodyParser=require('body-parser');

module.exports=(app,server)=>{


app.use(bodyParser.urlencoded({ extended: false }))
app.get('/admin.php',(req,res)=>{
    console.log()
    switch(req.query.page.trim()){
        case('my-gallery-add-gallery'):
            res.sendFile(path.join(__dirname,"assert/index.development.add-gallery.html"))
            break;
        
    }
    
})

app.post('/admin-ajax.php',(req,res)=>{
    var response={};
    //check nonce 

    //check action
    switch (req.query.action.trim()){
        case ('news_parser_parsing_api'):
            //parse single
            console.log(req.query.url,'\n');
            if(req.query.status==='single'&&req.query.url.trim()==='https://www.motor1.com/news/351527/2020-bmw-1-series-revealed/?utm_source=RSS&utm_medium=referral&utm_campaign=RSS-all-'){
                
                res.sendFile(path.resolve(__dirname,'mock/single.gallery.json'));
            }else if(req.query.status==='single'){
                response.err=1;
                response.msg={
                    type:'error',
                    text:'Please enter url 	https://www.motor1.com/news/351527/2020-bmw-1-series-revealed/?utm_source=RSS&utm_medium=referral&utm_campaign=RSS-all- to get results.'
                }
                res.send(JSON.stringify(response));
            }
            
            //parse list
            if(req.query.status==='list'&&req.query.url.trim()==='http://www.motor1.com/rss/news/all/'){
                res.sendFile(path.resolve(__dirname,'mock/list.json'));
            }else if(req.query.status==='list'){
                response.err=1;
                response.msg={
                    type:'error',
                    text:'Please enter url http://www.motor1.com/rss/news/all/ to get results.'
                }
                res.send(JSON.stringify(response));
            }
        break;
        case ('news_parser_settings_api'):

            if(req.query.status.trim()==='get'||req.query.status.trim()==='default'){
                res.sendFile(path.resolve(__dirname,'mock/settings.default.json'));
            }
            if(req.query.status.trim()==='save'){
                var main={
                        err:0,
                        msg:{
                            type:'success',
                            text:'Settings was saved'
                        }
                    }
                response={
                    main
                }
                res.send(JSON.stringify(response));
            }
        break;
    }
        
})

}