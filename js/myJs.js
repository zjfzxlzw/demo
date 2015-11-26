			var bt=document.getElementById("bt-1");
			var bt_2=document.getElementsByClassName("x");
			var follow=document.getElementsByClassName("follow");
			var rem=document.getElementsByClassName("remind");
			var main=document.getElementsByClassName("main");
			var login=document.getElementsByClassName("login");
			var zhezhao=document.getElementsByClassName("zhezhao");
			var imgOn=document.getElementsByClassName("imgOn");
			var list=document.getElementsByClassName("list");
			var imgs=document.getElementsByClassName("imgs");
			var imgList=document.getElementsByClassName("imgList");
			var img_1=imgOn[0];
			var img_2=imgOn[1];
			var img_3=imgOn[2];
			var close=document.getElementsByClassName("close");
			var form=document.getElementById("form");
			var login_bt=document.getElementsByClassName("login_bt");
			var tb_1=document.getElementsByClassName("tb_1");
			var tb_2=document.getElementsByClassName("tb_2");
			var pg_bt=document.getElementsByClassName("pg_bt");
			var pg_img1=document.getElementsByClassName("pg_img1");
			var pg_img2=document.getElementsByClassName("pg_img2");
			var pg_tmp=1;
			var l_tmp=10;
			var tmp=0;
			var t_lesson=document.getElementsByClassName("t_lesson");
			var big_img=document.getElementsByClassName("big_img");
			var rl_content=document.getElementsByClassName("rl_content");
			var rl_cleft=document.getElementsByClassName("rl_cleft");
			var rl_cright=document.getElementsByClassName("rl_cright");
			var rl_crb=document.getElementsByClassName("rl_crb");
			var video=document.getElementsByClassName("video");
			var video_p=document.getElementsByClassName("video_p");
			var big_lesson=document.getElementsByClassName("big_lesson");
			var big_imgs=document.getElementsByClassName("big_imgs");
			var details=document.getElementsByClassName("details");
			var d_fans=document.getElementsByClassName("d_fans");
			var bl_bottom=document.getElementsByClassName("bl_bottom");
			var publish=document.getElementById("publish");
			var classify=document.getElementById("classify");
			var v=document.getElementById("video");
			var cancel=document.getElementById("cancel");
			var u=[];
			var time=0;
			//获取元素类型子节点
			function getChildren(oParent){
			     var aResult = [];
     			 var aChild = oParent.childNodes;
     			for(var i=0;i<aChild.length;i++){
           			if(aChild[i].nodeType==1){
                 	aResult.push(aChild[i]);
           			}
     			}
     			return aResult;
			}

			//获取cookie
			function getCookie(name){
				var cookieName=encodeURIComponent(name)+"=";
				var cookieStart=document.cookie.indexOf(cookieName);
				var cookieValue=null;
				if(cookieStart>-1){
					var cookieEnd=document.cookie.indexOf(";",cookieStart);
					if(cookieEnd==-1){
						cookieEnd=document.cookie.length;
					}
					cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
				}
				return cookieValue;
			}
			//设置cookie
			function setCookie(name, value, expires, path, domain, secure) {
 				 var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  				if (expires)
    				cookie += '; expires=' + expires.toGMTString();
  				if (path)
   					 cookie += '; path=' + path;
  				if (domain)
   					 cookie += '; domain=' + domain;
  				if (secure)
    				cookie += '; secure=' + secure;
 				 document.cookie = cookie;
			}
			//删除cookie
			function delCookie(name){
				var date = new Date();
   				date.setTime(date.getTime() - 10000);
   				document.cookie = name + "=a; expires=" + date.toGMTString();
			}
			//淡入
			function fadeIn(elem){
				setOpacity(elem,0);
				var distance=100;
				var stepLength=2;
				var offset=0;
				var step=function(){
					var tmp=offset+stepLength;
				if(tmp<distance){
					setOpacity(elem,tmp);
					offset=tmp;
				}else{
					setOpacity(elem,tmp);
					clearInterval(intervalID);
				}
				}
				var intervalID=setInterval(step,10);
			}
			//设置透明度
			function setOpacity(elem,level){ 
  				if(elem.filters){ 
    				elem.style.filter = "alpha(opacity="+level+")";
 				}else{ 
    				elem.style.opacity = level / 100;
  				}
			}
			//轮播
			function carousel(x){
				var num=x;
				var step=function(){
					if(num<list.length){
						for(var i=0;i<list.length;i++){
								imgOn[i].style.display="none";
								list[i].style.backgroundColor="#fff";
						}
						imgOn[num].style.display="inline";
						list[num].style.backgroundColor="#333";
						fadeIn(imgOn[num]);
						
						num++;
						if(num==list.length){
							num=0;
						}
						
					}else{
						num=0;
					}
				}
			
				var autoChange=setInterval(step,5000);
				
				imgs[0].onmouseover=function(){
						tmp=num;
						clearInterval(autoChange);
					}			
			}
			//url添加数据
			function addURLParam(url, name, value){
				url+=(url.indexOf("?")==-1?"?":"&");
				url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
				return url;
			}
			//cookie 关闭提醒
				bt_2[0].onclick=function(){
					setCookie("rmdis",1);
					rem[0].style.display="none";
				}
			//课程切换
			tb_1[0].onclick=function(){
				l_tmp=10;
				getLessons(pg_tmp,20,10);
				tb_1[0].style.backgroundColor="#39a030";
				tb_1[0].style.color="#fff";
				tb_2[0].style.backgroundColor="#fff";
				tb_2[0].style.color="#666";
			}
			tb_2[0].onclick=function(){
				l_tmp=20;
				getLessons(pg_tmp,20,20);
				tb_2[0].style.backgroundColor="#39a030";
				tb_2[0].style.color="#fff";
				tb_1[0].style.backgroundColor="#fff";
				tb_1[0].style.color="#666";
			}
			//页码切换
			function colorchange(){
				for(var i=0;i<8;i++){
					pg_bt[i].style.color="#666";
				}
			}
			function pageClick(){
				function helper(i){
					return function(){
							getLessons(i,20,l_tmp);
							pg_tmp=i;
							colorchange();
							pg_bt[i].style.color="#39a030";
					}
				}
				for(var i=0;i<8;i++){
					pg_bt[i].onclick=helper(i);
				}
			}
			pg_img2[0].onclick=function(){
				if(pg_tmp==8){
					pg_tpm=8;
					getLessons(pg_tmp,20,l_tmp);
					colorchange();
					pg_bt[7].style.color="#39a030";
						
				}else{
					pg_tmp=pg_tmp+1;
					getLessons(pg_tmp,20,l_tmp);
					colorchange();
					pg_bt[pg_tmp-1].style.color="#39a030";
					
				}
				
			}
			pg_img1[0].onclick=function(){
				if(pg_tmp==1){
					pg_tmp=1;
					getLessons(pg_tmp,20,l_tmp);
					colorchange();
					pg_bt[0].style.color="#39a030";
					
				}else{
					pg_tmp=pg_tmp-1;
					getLessons(pg_tmp,20,l_tmp);
					colorchange();
					pg_bt[pg_tmp-1].style.color="#39a030";	
				}
			}
			//关闭登录
				close[0].onclick=function(){
					login[0].style.display="none";
					zhezhao[0].style.display="none";
				}
			//关注登录窗口
				bt.onclick=function(){
					if(getCookie("loginSuc")==1){
						setCookie("followSuc",1);
						bt.style.display="none";
						follow[0].style.display="inline-block";
					}else{
						login[0].style.display="block";
						zhezhao[0].style.display="block";
					}
				}
			//取消关注
			cancel.onclick=function(){
				bt.style.display="inline-block";
				follow[0].style.display="none";
				delCookie("followSuc");
			}
			//鼠标从轮播图片移出
				imgs[0].onmouseout=function(){
						var n=tmp-1;
						switch(n){
							case -1:
							  	carousel(0);
							  	break;
							case 0:
								carousel(1);
								break;
							case 1:
								carousel(2);
								break;
							
						}
						
					}

			//登录按钮
			login_bt[0].onclick=function(){
					var xhr=new XMLHttpRequest();
					xhr.onload=function(){
					if(xhr.readyState==4){
						if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
							var x=xhr.responseText;
							if(x==1){
								login[0].style.display="none";
								zhezhao[0].style.display="none";
								bt.style.display="none";
								follow[0].style.display="inline-block";
								setCookie("loginSuc",1);
								setCookie("followSuc",1);
							}else{
								alert("账户或密码错误");
							}
						}else{
							alert("Request was unsuccessful:"+xhr.staturs);
						}
					}
				}
				var url="http://study.163.com/webDev/login.htm";
				var text1=document.getElementById("text1").value;
				var text2=document.getElementById("text2").value;
				var uname=hex_md5(text1);
				var pswd=hex_md5(text2);
				url=addURLParam(url,"userName",uname);
				url=addURLParam(url,"password",pswd);
				xhr.open("get",url,true);
				xhr.send();
				}
			
			//获取课程
			function getLessons(pageNo,pagesize,type){
				var xhr=new XMLHttpRequest();
				var a=encodeURIComponent(pageNo);
				var b=encodeURIComponent(pagesize);
				var c=encodeURIComponent(type);
				xhr.onload=function(){
						if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
						 	var ls_copy=JSON.parse(xhr.responseText);
						 	for(var i=0;i<20;i++){
						 		var t_lescopy=getChildren(t_lesson[i]);
						 		t_lescopy[0].src=ls_copy.list[i].middlePhotoUrl;
						 		t_lescopy[1].innerHTML=ls_copy.list[i].description;
						 		t_lescopy[2].innerHTML=ls_copy.list[i].provider;
						 		t_lescopy[3].childNodes[2].innerHTML=ls_copy.list[i].learnerCount;
						 		t_lescopy[4].childNodes[1].innerHTML=ls_copy.list[i].price;
						 		u[i]=String(ls_copy.list[i].bigPhotoUrl);
						 		}
						 		getMsg();
						 		function getMsg(){
						 			function helper_1(i){
						 				return function(){
						 				var y=encodeURIComponent(window.event.clientY)+"px";
										var x=encodeURIComponent(window.event.clientX)+"px";
										big_lesson[0].style.top=y;
										big_lesson[0].style.left=x;
										big_lesson[0].style.display="inline-block";
										big_imgs[0].childNodes[0].src=u[i];
										details[0].childNodes[0].innerHTML=ls_copy.list[i].name;
										d_fans[0].childNodes[1].innerHTML=ls_copy.list[i].learnerCount;
										publish.childNodes[1].innerHTML=ls_copy.list[i].provider;
										classify.childNodes[1].innerHTML=ls_copy.list[i].categoryName;
										bl_bottom[0].innerHTML=ls_copy.list[i].description;	
						 				}
						 			}
						 			function helper_2(i){
						 				return function(){
						 					big_lesson[0].style.display="none";
						 				}
						 			}
						 			for(var i=0;i<20;i++){
						 				t_lesson[i].onmousemove=helper_1(i);
						 				t_lesson[i].onmouseout=helper_2(i);
						 			}

						 		}
						 		
						}else{
							alert("Request was unsuccessful:"+xhr.staturs);
						}
					}
				var url="http://study.163.com/webDev/couresByCategory.htm";
				url=addURLParam(url,"pageNo",a);
				url=addURLParam(url,"psize",b);
				url=addURLParam(url,"type",c);
				xhr.open("get",url,true);
				xhr.send();
			}
			//右侧热门课程
			function getHotLessons(){
				
			var getHot=setInterval(getList,5000);
		}
		function getList(){
				var xhr=new XMLHttpRequest();
				xhr.onload=function(){
						if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
							var ls_copy=JSON.parse(xhr.responseText);
							if(time==0){
								for(var i=0;i<10;i++){
									rl_cleft[i].childNodes[0].src=ls_copy[i].smallPhotoUrl;
									rl_cright[i].childNodes[1].innerHTML=ls_copy[i].description;
									rl_crb[i].childNodes[1].innerHTML=ls_copy[i].learnerCount;
								}
									time=1;
							}else{
									for(var i=10;i<20;i++){
									rl_cleft[i].childNodes[0].src=ls_copy[i].smallPhotoUrl;
									rl_cright[i].childNodes[1].innerHTML=ls_copy[i].description;
									rl_crb[i].childNodes[1].innerHTML=ls_copy[i].learnerCount;
								}
									time=0;
							}
	
						}else{
							alert("Request was unsuccessful:"+xhr.staturs);
						}
					}
				var url="http://study.163.com/webDev/hotcouresByCategory.htm";
				xhr.open("get",url,true);
				xhr.send();
			}
			//关闭提醒
			function getRemind(){
				if(getCookie("rmdis")==1){
					rem[0].style.display="none";
				}
			}
			//视频弹窗
			video[0].onclick=function(){
				zhezhao[0].style.display="block";
				video_p[0].style.display="inline-block";
				
			}
			close[1].onclick=function(){
					video_p[0].style.display="none";
					zhezhao[0].style.display="none";
					v.pause();
				}
			//初始化
			list[0].style.backgroundColor="#333";
			carousel(1);
			getRemind();
			pageClick();
			getLessons(1,20,10);
			getHotLessons();
			pg_bt[0].style.color="#39a030";
			