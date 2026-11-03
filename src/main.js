import './style.css';
import {createIcons, ArrowUpRight, Menu, X, MapPin, ArrowUp, ArrowLeft, ArrowRight, Expand, Instagram, LampDesk, Wine, HeartHandshake, Clock3, MessageCircle, Info, Check} from 'lucide';
const icons = {ArrowUpRight, Menu, X, MapPin, ArrowUp, ArrowLeft, ArrowRight, Expand, Instagram, LampDesk, Wine, HeartHandshake, Clock3, MessageCircle, Info, Check};
const refreshIcons = () => createIcons({icons});
const dishes = [
  {name:'Butter Chicken',image:'butter-chicken.webp',description:'Tandoor-kissed chicken. Silky tomato gravy. Pure comfort.',price:'695',tag:'HOUSE FAVOURITE',type:'NON-VEGETARIAN'},
  {name:'Dal Makhani',image:'dal.jpg',description:'Black lentils, slow-simmered overnight. Rich and soulful.',price:'495',tag:'SLOW-COOKED',type:'VEGETARIAN'},
  {name:'Paneer Tikka',image:'paneer.jpg',description:'Hand-cut paneer, fragrant spices and a touch of char.',price:'525',tag:'FROM THE TANDOOR',type:'VEGETARIAN'},
  {name:'Hyderabadi Biryani',image:'biryani.jpg',description:'Aromatic basmati, tender mutton and saffron. Dum-cooked.',price:'795',tag:'A ROYAL CLASSIC',type:'NON-VEGETARIAN'},
  {name:'Gulab Jamun',image:'dessert.jpg',description:'Golden milk dumplings in delicate rose-cardamom syrup.',price:'295',tag:'SWEET TRADITIONS',type:'VEGETARIAN'}
];
document.querySelector('#dish-grid').innerHTML = dishes.map(d=>`<article class="dish reveal"><div class="dish-image"><img src="/images/${d.image}" alt="${d.name}, beautifully prepared with traditional Indian ingredients" loading="lazy" width="400" height="500"/><span>${d.tag}</span></div><h3>${d.name}</h3><p>${d.description}</p><div class="dish-price"><span>₹ ${d.price}</span><span>${d.type}</span></div></article>`).join('');
const menus = {
  'Starters': {image:'paneer.jpg',alt:'Tandoori paneer tikka with charred peppers',items:[['Tandoori Paneer Tikka','Hand-cut cottage cheese, spiced yoghurt, charred peppers.','525','CHEF’S PICK'],['Murgh Malai Tikka','Tender chicken, cream cheese, cardamom, a hint of smoke.','625'],['Dahi Ke Kebab','Silken hung curd, crisp golden crust, mint chutney.','445'],['Amritsari Fish Tikka','Carom-spiced fish, a squeeze of lime, house chutney.','645']]},
  'Main Course': {image:'butter-chicken.webp',alt:'Creamy butter chicken in a traditional serving bowl',items:[['Signature Butter Chicken','Tandoor-roasted chicken, slow-cooked tomato, cultured cream.','695','HOUSE FAVOURITE'],['Dal Makhani','Black lentils simmered overnight, finished with white butter.','495'],['Rajasthani Laal Maas','Slow-braised mutton, Mathania chillies, traditional spices.','845'],['Hyderabadi Dum Biryani','Saffron basmati, tender mutton, caramelised onions, raita.','795']]},
  'Breads': {image:'feast.jpg',alt:'Freshly baked Indian bread served alongside rich curries',items:[['Garlic Butter Naan','Tandoor-baked, brushed with garlic butter and coriander.','145','A PERFECT PAIRING'],['Laccha Paratha','Crisp, flaky layers of whole-wheat bread with ghee.','125'],['Saffron & Stone Kulcha','Stuffed with spiced paneer and a touch of green chilli.','195'],['Tandoori Roti','Whole wheat, hand-rolled, straight from the clay oven.','85']]},
  'Desserts': {image:'dessert.jpg',alt:'Traditional gulab jamun in fragrant sugar syrup',items:[['Gulab Jamun','Warm milk dumplings, rose-cardamom syrup, pistachio.','295','SWEET TRADITION'],['Saffron Phirni','Slow-set ground rice pudding, Kashmiri saffron, almonds.','325'],['Malai Kulfi','Traditional reduced-milk ice cream, pistachio crumble.','295'],['Ghewar & Rabri','Jaipur’s honeycomb classic, saffron rabri, rose petals.','395']]},
  'Beverages': {image:'dining.jpg',alt:'A beautiful dining space for relaxed conversations and drinks',items:[['Saffron & Rose Lassi','Chilled cultured yoghurt, saffron, a whisper of rose.','245','HOUSE SPECIAL'],['Aam Panna','Green mango, roasted cumin, fresh mint.','225'],['Masala Chai','Slow-brewed Assam tea, ginger, cardamom, warm milk.','175'],['Pink City Cooler','Pomegranate, lime, fragrant basil, sparkling water.','275']]}
};
const tabs = document.querySelector('.menu-tabs');
tabs.innerHTML=Object.keys(menus).map((name,i)=>`<button class="menu-tab" id="tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="menu-items" tabindex="${i===0?0:-1}" data-category="${name}">${name}</button>`).join('');
function setMenu(category, focus=false){
  const menu=menus[category];
  for(const tab of tabs.children){const selected=tab.dataset.category===category;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;if(selected){document.querySelector('#menu-items').setAttribute('aria-labelledby',tab.id);if(focus)tab.focus();}}
  const image=document.querySelector('#menu-image');image.src=`/images/${menu.image}`;image.alt=menu.alt;
  document.querySelector('#menu-items').innerHTML=menu.items.map((item,i)=>`<article class="menu-item" style="animation-delay:${i*45}ms"><div class="menu-item-top"><h3>${item[0]}${item[3]?`<span class="menu-label">${item[3]}</span>`:''}</h3><span>₹ ${item[2]}</span></div><p>${item[1]}</p></article>`).join('');
}
tabs.addEventListener('click',e=>{const tab=e.target.closest('[role=tab]');if(tab)setMenu(tab.dataset.category);});
tabs.addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','Home','End'];if(!keys.includes(e.key))return;e.preventDefault();const names=Object.keys(menus);const current=[...tabs.children].findIndex(t=>t.getAttribute('aria-selected')==='true');let next=e.key==='Home'?0:e.key==='End'?names.length-1:(current+(e.key==='ArrowRight'?1:-1)+names.length)%names.length;setMenu(names[next],true);});
setMenu('Starters');
const header=document.querySelector('#header');
const toggle=document.querySelector('.mobile-toggle');
const navigation=document.querySelector('#navigation');
const closeNavigation=()=>{navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.innerHTML='<i data-lucide="menu"></i>';refreshIcons();};
toggle.addEventListener('click',e=>{e.stopPropagation();const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open);toggle.innerHTML=`<i data-lucide="${open?'x':'menu'}"></i>`;refreshIcons();});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNavigation));
document.addEventListener('click',e=>{if(navigation.classList.contains('open')&&!header.contains(e.target))closeNavigation();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeNavigation();toggle.focus();}});
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>25),{passive:true});
header.classList.toggle('scrolled',window.scrollY>25);
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navigation.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}}),{rootMargin:'-15% 0px -55% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(s=>navObserver.observe(s));
const lightbox=document.querySelector('#lightbox');
document.querySelectorAll('.gallery-item').forEach(button=>button.addEventListener('click',()=>{const image=document.querySelector('#lightbox-image');image.src=`/images/${button.dataset.image}`;image.alt=button.querySelector('img').alt;document.querySelector('#lightbox-caption').textContent=button.dataset.caption;lightbox.showModal();}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
const testimonials=[
  {quote:'“The kind of evening you wish would last a little longer. Beautiful flavours, thoughtful details, and hospitality that feels like home.”',name:'Aarav & Meera',detail:'An imagined anniversary evening · Sample testimonial'},
  {quote:'“Every dish felt like a familiar story told beautifully. The slow-cooked dal and the warm welcome would bring us back in a heartbeat.”',name:'Riya S.',detail:'An imagined family dinner · Sample testimonial'},
  {quote:'“A little Jaipur magic at every turn. From the first bite to the last conversation, this is what a special evening should feel like.”',name:'Kabir M.',detail:'An imagined celebration · Sample testimonial'}
];
let quoteIndex=0;
function showQuote(){const t=testimonials[quoteIndex];document.querySelector('#quote').textContent=t.quote;document.querySelector('#quote-name').textContent=t.name;document.querySelector('#quote-detail').textContent=t.detail;document.querySelector('#quote-count').textContent=`0${quoteIndex+1} / 03`;}
document.querySelector('#quote-prev').addEventListener('click',()=>{quoteIndex=(quoteIndex+2)%3;showQuote();});
document.querySelector('#quote-next').addEventListener('click',()=>{quoteIndex=(quoteIndex+1)%3;showQuote();});showQuote();
const dateInput=document.querySelector('[name=date]');
function localDate(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
dateInput.min=localDate();
const form=document.querySelector('#reservation-form');
const phoneInput=form.elements.phone;
phoneInput.addEventListener('input',()=>phoneInput.setCustomValidity(''));
form.elements.name.addEventListener('input',()=>form.elements.name.setCustomValidity(''));
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const name=data.get('name').trim();const digits=data.get('phone').replace(/\D/g,'');if(name.length<2){form.elements.name.setCustomValidity('Please enter at least two non-space characters.');form.reportValidity();return;}if(digits.length<10||digits.length>15){phoneInput.setCustomValidity('Please enter a valid phone number with 10 to 15 digits.');form.reportValidity();return;}if(data.get('date')<localDate()){dateInput.setCustomValidity('Please choose today or a future date.');form.reportValidity();return;}
  const date=new Date(`${data.get('date')}T12:00:00`);document.querySelector('#guest-name').textContent=name.split(/\s/)[0];document.querySelector('#request-summary').textContent=`Your sample request: ${data.get('guests')} on ${date.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})} at ${data.get('time')}.`;form.hidden=true;document.querySelector('.form-title').hidden=true;document.querySelector('#form-success').hidden=false;document.querySelector('#form-reset').focus();
});
document.querySelector('#form-reset').addEventListener('click',()=>{form.reset();form.hidden=false;document.querySelector('.form-title').hidden=false;document.querySelector('#form-success').hidden=true;form.elements.name.focus();});
const infoDialog=document.querySelector('#info-dialog');
function showInfo(title,content){document.querySelector('#info-title').textContent=title;document.querySelector('#info-content').innerHTML=content;infoDialog.showModal();}
document.querySelector('.info-dismiss').addEventListener('click',()=>infoDialog.close());
document.querySelector('#whatsapp').addEventListener('click',()=>showInfo('Let’s keep it honest.','<p>Saffron & Stone is a fictional restaurant concept. There is no live WhatsApp number or reservation service connected to this website.</p><p>You can explore the reservation form to preview the experience. No message is sent, no personal details are stored, and no table is booked.</p>'));
document.querySelector('#instagram-link').addEventListener('click',()=>showInfo('A glimpse of what’s to come.','<p>This is an Instagram placeholder for our fictional restaurant. There is no official social account connected to this demo.</p><p>In the meantime, explore our gallery for a taste of the Saffron & Stone mood.</p>'));
document.querySelector('#credits-button').addEventListener('click',()=>showInfo('Behind the imagery.','<p>Real food and interior photography is used as visual inspiration for this fictional restaurant. Photos do not depict a real Saffron & Stone venue or its dishes.</p><p>Photography sources: <a href="https://glebekitchen.com/butter-chicken-murgh-makhani-indian-hotel-style/" target="_blank" rel="noopener noreferrer">Glebe Kitchen</a>, <a href="https://rassaboston.com/" target="_blank" rel="noopener noreferrer">Rassa</a>, <a href="https://www.pexels.com/photo/32657750/" target="_blank" rel="noopener noreferrer">Pexels</a>, <a href="https://sumesshmenonassociates.com/aubergin-dining-restaurant-interior-design/" target="_blank" rel="noopener noreferrer">Sumessh Menon Associates</a>, <a href="https://thearchitectsdiary.com/top-10-restaurant-interior-design-in-india/" target="_blank" rel="noopener noreferrer">The Architects Diary</a>, <a href="https://www.mygingergarlickitchen.com/tandoori-paneer-tikka/" target="_blank" rel="noopener noreferrer">My Ginger Garlic Kitchen</a>, <a href="https://www.whiskaffair.com/" target="_blank" rel="noopener noreferrer">Whisk Affair</a>, and <a href="https://thebellyrulesthemind.net/gulab-jamun-recipe/" target="_blank" rel="noopener noreferrer">The Belly Rules the Mind</a>.</p><p>Production use requires appropriate image permissions or licensed replacement assets.</p>'));
document.querySelector('#year').textContent=new Date().getFullYear();
refreshIcons();
