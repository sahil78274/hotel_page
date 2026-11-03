import { chromium } from '@playwright/test';
import serverChromium from '@sparticuz/chromium';
import assert from 'node:assert/strict';
import { inflate } from '../node_modules/@sparticuz/chromium/build/lambdafs.js';
import { mkdir } from 'node:fs/promises';
await inflate('node_modules/@sparticuz/chromium/bin/al2023.tar.br');
await mkdir('test-results', {recursive:true});
const browser=await chromium.launch({headless:true,executablePath:await serverChromium.executablePath(),args:serverChromium.args,env:{...process.env,LD_LIBRARY_PATH:`/tmp/al2023/lib:${process.env.LD_LIBRARY_PATH||''}`}});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5173/',{waitUntil:'networkidle'});
await page.screenshot({path:'test-results/desktop.png',fullPage:false});
assert.equal(await page.title(),'Saffron & Stone — Indian Soul. Jaipur Spirit.');
for(const category of ['Main Course','Breads','Desserts','Beverages','Starters']){
 await page.getByRole('tab',{name:category,exact:true}).click();
 assert.equal(await page.locator('.menu-item').count(),4);
}
await page.getByRole('tab',{name:'Starters',exact:true}).focus();
await page.keyboard.press('ArrowRight');
assert.equal(await page.getByRole('tab',{name:'Main Course',exact:true}).getAttribute('aria-selected'),'true');
await page.locator('.gallery-item').first().click();
assert.equal(await page.locator('#lightbox').evaluate(el=>el.open),true);
await page.keyboard.press('Escape');
assert.equal(await page.locator('#lightbox').evaluate(el=>el.open),false);
await page.locator('#quote-next').click();assert.match(await page.locator('#quote-name').textContent(),/Riya/);
await page.locator('#whatsapp').click();assert.equal(await page.locator('#info-dialog').evaluate(el=>el.open),true);await page.keyboard.press('Escape');
await page.locator('#reservation-form button[type=submit]').click();assert.equal(await page.locator('#form-success').isVisible(),false);
await page.locator('[name=name]').fill('Test Guest');await page.locator('[name=phone]').fill('9876543210');
const date=new Date();date.setDate(date.getDate()+1);
await page.locator('[name=date]').fill(date.toISOString().slice(0,10));await page.locator('[name=time]').selectOption('7:00 PM');await page.locator('[name=guests]').selectOption('2 guests');
await page.locator('#reservation-form button[type=submit]').click();assert.equal(await page.locator('#form-success').isVisible(),true);assert.match(await page.locator('#form-success').textContent(),/not a confirmed reservation/);
await page.locator('#form-reset').click();assert.equal(await page.locator('#reservation-form').isVisible(),true);
// Load all lazy imagery and check their successful decoding.
await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';await img.decode().catch(()=>{});}});
assert.deepEqual(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.closest('dialog')&&(!i.complete||i.naturalWidth===0)).map(i=>i.src)),[]);
for(const width of [1440,1024,768,390,320]){
 await page.setViewportSize({width,height:900});
 await page.evaluate(()=>window.scrollTo(0,0));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`Overflow at ${width}`);
 if(width===390){await page.screenshot({path:'test-results/mobile.png'});await page.getByRole('button',{name:'Open navigation',exact:true}).click();assert.equal(await page.locator('#navigation').evaluate(el=>el.classList.contains('open')),true);await page.locator('#navigation a[href="#menu"]').click();assert.equal(await page.locator('#navigation').evaluate(el=>el.classList.contains('open')),false);}
}
assert.deepEqual(errors,[]);
await browser.close();console.log('PASS: responsive widths, images, navigation, menu tabs + keyboard, gallery, testimonials, demo dialogs, form validation + submission, and no browser errors.');
