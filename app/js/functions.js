// get json
var prods = JSON.stringify(data);
var mydata = JSON.parse(prods);


// crea pantalla principal de marcas
var principal = document.getElementById('principal');
mydata.forEach(function(item,i){
	var portada = document.createElement("DIV");
	portada.classList.add("portada");
	portada.dataset.id = i;
	portada.dataset.category = item.id;
	var imgpda = document.createElement("IMG");
	imgpda.setAttribute("src", "images/"+item.portada);
	imgpda.setAttribute("alt", item.label);
	portada.appendChild(imgpda);
	principal.appendChild(portada);

});

// Selecciona marca
var portadas = document.getElementsByClassName('portada');
var cnav = document.querySelector('.container-nav');
var configurador = document.querySelector('.configurador');
var portlength = portadas.length;
for (var i = 0; i < portlength; i++) {
    portadas[i].addEventListener("click", mimarca);
}
function mimarca(){
	principal.classList.add("hide");
	cnav.classList.add("show");
	creamenu(this.dataset.id);
	cargacat(this.dataset.id,0);
	clickNav(this.dataset.id);



	// crea logo
	var logobrand = document.getElementById('logobrand');
	var simg = document.createElement("IMG");
	simg.setAttribute("src", "images/"+ mydata[this.dataset.id].logo);
	simg.setAttribute("alt", mydata[this.dataset.id].label);
	logobrand.appendChild(simg);

	document.body.classList.add(mydata[this.dataset.id].id);
	configurador.classList.remove('hide');

	// imagen de fondo para el configurador
	contconf.setAttribute('style', 'background-image:url(images/'+ mydata[this.dataset.id].resumen +' )');
}
	var contconf = document.querySelector('.container-conf');

var categorias = {};

// crea menu
var navbar = document.getElementById('navbar');
function creamenu(mmarca){
	mydata[mmarca].catalogo.forEach(function(item,i){
		var cont = document.createElement("DIV");
		cont.classList.add("nav-item");
		cont.id = "category-"+item.id;
		cont.dataset.id = i;
		cont.dataset.category = item.id;
		var contImg = document.createElement("DIV");
		contImg.classList.add("cat-icon");
		var img = document.createElement("IMG");
		var h2 = document.createElement("H2");
		img.setAttribute("src", "images/"+item.icono);
		img.setAttribute("alt", item.label);
		var h2text = document.createTextNode(item.label);
		h2.appendChild(h2text);
		cont.appendChild(contImg);
		contImg.appendChild(img);
		cont.appendChild(h2);
		navbar.appendChild(cont);

		categorias[item.id] =  item.label;
	});
}


// agrega clase active on clic sobre el menu
function clickNav(meo){
	var navitem = document.getElementsByClassName('nav-item');
	var itemslength = navitem.length;
	navitem[0].classList.add('active');
	for (var j = 0; j < itemslength; j++) {
	    navitem[j].addEventListener("click", activeNav);
	}
	function activeNav(){	
		for (var i = 0; i < itemslength; i++) {
		    navitem[i].classList.remove('active');
		    navitem[i].classList.remove('evest');
		}
		this.classList.toggle('active');
		cargacat(meo,this.dataset.id);
		if(contconf.classList.contains("show")){
			contconf.classList.remove("show");
		}
		config.classList.remove("active");

		var modalback = document.querySelector('.modal-backdrop');
		var parentm = document.querySelector('.container-tabs');
		if(modalback){
    		modalback.parentNode.removeChild(modalback);
		}
	}
}

// agrega clase active on clic sobre los productos


// carga la primer categoria por default
//window.onload = function(){cargacat(0);};

var prodrow = document.getElementById('prodrow');
function cargacat(brand,index){
	// (todo) agregar if para que solo lo haga si el json tiene contenido
	var nav = document.createElement("UL");
	var tabs = document.createElement("DIV");
	nav.classList.add("nav", "nav-tabs");
	tabs.classList.add("tab-content","cat-"+mydata[brand].catalogo[index].id);
	var i = 1;

	// (todo) dar vuelta el array para que aparezca primero el ultimo
	for (var value of mydata[brand].catalogo[index].datos.subcategorias) {
		// crea solapas
		var list = document.createElement("LI");
		var link = document.createElement("A");
		link.href = "#tab-"+i;
		var linktext = document.createTextNode(value.label);
		link.appendChild(linktext);
		list.appendChild(link);
		nav.appendChild(list);

		// crea tabs
		var tab = document.createElement("DIV");
		tab.id = "tab-"+i;
		tab.classList.add("tab-pane");
		var body = document.createElement("DIV");
		body.classList.add("tab-body");
		var jode = document.createElement("DIV");
		jode.classList.add("solobody");
		if(value.imagenes[0] !== undefined){
			var figure = document.createElement("FIGURE");
			figure.classList.add("cont-img", "box-img");
			var timg = document.createElement("IMG");
			timg.setAttribute("src", "images/"+value.imagenes[0]);
			timg.setAttribute("alt", value.label);
			timg.classList.add("js-openmodal-"+i, "img-responsive");

			figure.appendChild(timg);
			jode.appendChild(figure);

			var modal = document.createElement("DIV");
			modal.classList.add("modal", "fade");
			modal.id = "modal-"+i;
			modal.tabindex = "-1";
			modal.role = "dialog";
			var dialog = document.createElement("DIV");
			dialog.classList.add("modal-dialog");
			var mcontent = document.createElement("DIV");
			mcontent.classList.add("modal-content");
			var mbody = document.createElement("DIV");
			mbody.classList.add("modal-body");
			var button = document.createElement("BUTTON");
			button.classList.add("close");
			button.dataset.dismiss = "modal";
			button.type = "button";
			button.setAttribute('aria-label', "Close");
			var span = document.createElement("SPAN");
			span.setAttribute('aria-hidden', true);
			var txtspan = document.createTextNode("×");

			var content = document.createElement("DIV");
			content.classList.add("content");
			var scontainer = document.createElement("DIV");
			scontainer.classList.add("swiper-container", "swiper-"+i);
			var pagination = document.createElement("DIV");
			pagination.classList.add("swiper-pagination");
			var bnext = document.createElement("DIV");
			bnext.classList.add("swiper-button-next");
			var bprev = document.createElement("DIV");
			bprev.classList.add("swiper-button-prev");
			var swrapper = document.createElement("DIV");
			swrapper.classList.add("swiper-wrapper");



			for (var slides of value.imagenes) {
				var slide = document.createElement("DIV");
				slide.classList.add("swiper-slide", "text-center"); 
				var figures = document.createElement("FIGURE");
				var simg = document.createElement("IMG");
				simg.setAttribute("src", "images/"+slides);
				simg.setAttribute("alt", value.label);
				simg.classList.add("img-slide");
				figures.appendChild(simg);
				slide.appendChild(figures);
				swrapper.appendChild(slide);
			}
			scontainer.appendChild(swrapper);
			scontainer.appendChild(pagination);
			scontainer.appendChild(bnext);
			scontainer.appendChild(bprev);
			content.appendChild(scontainer);

			span.appendChild(txtspan);
			button.appendChild(span);
			mbody.appendChild(button);
			mbody.appendChild(content);
			mcontent.appendChild(mbody);
			dialog.appendChild(mcontent);
			modal.appendChild(dialog);
			tab.appendChild(modal);
		}
		var conttable = document.createElement("DIV");
		conttable.classList.add("cont-table");
		var table = document.createElement("TABLE");
		table.classList.add("table");

		var thead = document.createElement("THEAD");
		thead.classList.add("thead");
		var thtr = document.createElement("TR");
		var thtduno = document.createElement("TD");
		var thtddos = document.createElement("TD");
		var thtdtres = document.createElement("TD");
		var thtdcuatro = document.createElement("TD");
		var txtthtduno = document.createTextNode(" ");
		var txtthtddos = document.createTextNode("Código");
		var txtthtdtres = document.createTextNode("Descripción");
		var txtthtdcuatro = document.createTextNode("Precio");

		thtduno.appendChild(txtthtduno);
		thtddos.appendChild(txtthtddos);
		thtdtres.appendChild(txtthtdtres);
		thtdcuatro.appendChild(txtthtdcuatro);
		thtr.appendChild(thtduno);
		thtr.appendChild(thtddos);
		thtr.appendChild(thtdtres);
		thtr.appendChild(thtdcuatro);
		thead.appendChild(thtr);
		table.appendChild(thead);

		var tbody = document.createElement("TBODY");
		


		var tmpprods = [];
		if (existsKey( mydata[brand].catalogo[index].id)){
			tmpprods = arrConfigurador[ mydata[brand].catalogo[index].id];
		}

		for (var trs of value.productos) {
			
			var tr = document.createElement("TR");
			var vacio = document.createElement("TD");
			var input = document.createElement("div");
			input.classList.add('check');



			var tdcod = document.createElement("TD");
			var tddes = document.createElement("TD");
			var tdpre = document.createElement("TD");
			var txtcod = document.createTextNode(trs.codigo);
			var txtdes = document.createTextNode(trs.descripcion);

			var num = addCommas(trs.precio);

			var txtpre = document.createTextNode(num+'\u20ac');
			vacio.appendChild(input);
			tdcod.appendChild(txtcod);
			tddes.appendChild(txtdes);
			tdpre.appendChild(txtpre);
			tdpre.classList.add("costo");

			for(var prod in tmpprods){
				if (tmpprods[prod][0].codigo == trs.codigo){
					input.classList.add('active');
					tdpre.classList.add("color");
				}
			}

			tr.classList.add("producto");
			tr.dataset.id = i;
			tr.dataset.codigo = trs.codigo;
			tr.dataset.categoria = mydata[brand].catalogo[index].id;
			tr.dataset.categorialabel = mydata[brand].catalogo[index].label;
			tr.dataset.subcategoria = value.id;
			tr.dataset.descripcion = trs.descripcion;
			tr.dataset.precio = trs.precio;

			tr.appendChild(vacio);
			tr.appendChild(tdcod);
			tr.appendChild(tddes);
			tr.appendChild(tdpre);
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		
		conttable.appendChild(table);
		jode.appendChild(conttable);
		body.appendChild(jode);
		tab.appendChild(body);
		tabs.appendChild(tab);

		// agrega calse a los primeros items
		if (i == 1){
			list.classList.add("active");
			tab.classList.add("active");
		}

		i++
	}
	prodrow.innerHTML = "";
	prodrow.appendChild(nav);
	prodrow.appendChild(tabs);
	var contador = i;

	for (var jjj = 1; jjj < contador; jjj++) {
		dibujaModal(jjj);
	}
	
	selectProduct();
	ftabs();
	//cerrarModal();
}

window.addEventListener("load", function() {
	ftabs();	
});

function dibujaModal(k){
	if(document.querySelector('.js-openmodal-'+ k)){
		document.querySelector('.js-openmodal-'+ k).addEventListener('click', function() {
			var myModal = new Modal({
				el: document.getElementById('modal-'+k),
				appendTo: '.container-tabs',
				keyboard: true,
			}).show();
			var swiper = new Swiper('.swiper-'+k, {
		    	pagination: {
			        el: '.swiper-pagination',
			        clickable: true,
		    	},
		    	navigation: {
			        nextEl: '.swiper-button-next',
			        prevEl: '.swiper-button-prev',
		   		},
		    });
		    cerrarModal()
		});
	}
}

function ftabs(){
	var myTabs = document.querySelectorAll("ul.nav-tabs > li");
	function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll(".tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
		//cerrarModal();
	}
	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks)
	}
}


// reiniciar app al hacer click
var reload = document.querySelector('.reload');
reload.addEventListener("click", refreshPage);
function refreshPage(){
    window.location.reload();
}

/*<div class="reslist" id="conflista">

<div class="itemlist">
					<h3>Pantallas y Accesorios</h3>
					<div class="prodel">· Medical Display, NDS EndoVue® 32" HD</div>
					<div class="prodel">· ZeroWire® DUO, Wireless HD-Video Transmission System</div>
				</div>
				*/

var config = document.querySelector('.configurador');
config.addEventListener("click", function(){

	if(!config.classList.contains("active")){
		navitema = document.querySelector('.nav-item.active');
		navitema.classList.add("evest");
	}

	var total = 0;

	var container = document.getElementById("conflista");
	container.innerHTML = '';
	
	for(var key in arrConfigurador)
	{	
		if(arrConfigurador[key].length > 0){

			var itemlist = document.createElement("div");
			itemlist.classList.add("itemlist");
			itemlist.classList.add("prod");
		
			var cath3 = document.createElement("h3");
			cath3.innerHTML = categorias[key];
			itemlist.appendChild(cath3);
			itemlist.dataset.categoria = key;
			objProd = arrConfigurador[key];
			for(var prod in objProd)
			{

				producto = objProd[prod];
				var prodel = document.createElement("div");
				prodel.classList.add("prodel");

				prodel.innerHTML = producto[0].descripcion;
				itemlist.appendChild(prodel);

				total += parseFloat(producto[0].precio);
				
			}

			container.appendChild(itemlist);

			itemlist.addEventListener("click", function(){
				idCat = this.dataset.categoria;
				eventFire(document.getElementById('category-'+idCat), 'click');
			});	
		}

	}

	var precio = document.getElementById("precio-total");
	precio.innerHTML= addCommas(total) + "€";

	if(config.classList.contains("active")){
		config.classList.remove("active");
		contconf.classList.remove("show");
		document.getElementById('category-'+idCat).classList.add("active");
	} else {
		config.classList.add("active");
		contconf.classList.add("show");
	}



	
});

var arrConfigurador = new Object();

function pushToAry(cat, val) {
   	
	if (!existsKey(cat)){
		var tmpArray = [];
		
		tmpArray.push(val);
		
		arrConfigurador[cat] = tmpArray;
	}
	else{
		var tmpArray = arrConfigurador[cat];
		
		tmpArray.push(val);

		arrConfigurador[cat] = tmpArray;
	}
  	

  	navitem = document.getElementById("category-"+cat);
  	navitem.classList.add("complete");


	var has = false;
	for(var key in arrConfigurador)
	{	
		
	     if ( arrConfigurador[key].length > 0){
	     	has = true;
	     }
	}


	configurador = document.getElementById("configurador");

  	if (has){
  		configurador.classList.add("complete");
  	}else{
  		configurador.classList.remove("complete");
  	}
  	
}

function removeFromAry(cat, val) {
   	

   	var tmpArray = [];
	objProd = arrConfigurador[cat];
	for(var prod in objProd)
	{

		producto = objProd[prod];
		if (producto[0].codigo != val[0].codigo){
			tmpArray.push(producto);
		}

		
	}



	arrConfigurador[cat] = tmpArray;
	
	if (tmpArray.length == 0){
		navitem = document.getElementById("category-"+cat);
  		navitem.classList.remove("complete");
	}
  	

	var has = false;
	for(var key in arrConfigurador)
	{	
		
	     if ( arrConfigurador[key].length > 0){
	     	has = true;
	     }
	}


	configurador = document.getElementById("configurador");
  	
  	if (has){
  		configurador.classList.add("complete");
  	}else{
  		configurador.classList.remove("complete");
  	}

}

function existsKey(clave){
	for(var key in arrConfigurador)
	{	
		
	     if ( key == clave){
	     	return true;
	     }
	}

	return false;
}

function selectProduct(){
	var producto = document.querySelectorAll('.producto');
	var reslist = document.querySelector('.reslist');
	producto.forEach(function(item){
		item.addEventListener("click", function(){
			this.querySelector('.check').classList.toggle('active');
			this.querySelector('.costo').classList.toggle('color');
			input = this.getElementsByClassName("check")[0];
			if ( input.classList.contains('active') ) {
				pushToAry(this.dataset.categoria, [this.dataset]);
				
			}
			else{
				removeFromAry(this.dataset.categoria, [this.dataset]);
				
			}
			
		});
	});
}

function cerrarModal(){
	window.addEventListener('click', function(e){
		var close = document.querySelector('.modal.show .close');
	  if (!document.querySelector('.modal-dialog').contains(e.target)){
	  		close.click();
	  } 
	});
}


function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}


function addCommas(nStr) {
    nStr += '';
    x = nStr.split(',');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

