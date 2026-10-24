(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('.site-loader');
  document.body.classList.add('is-loading');
  const finishLoader = () => {
    window.setTimeout(() => {
      document.body.classList.remove('is-loading');
      loader?.classList.add('is-complete');
    }, reducedMotion ? 0 : 360);
  };
  if (document.readyState === 'complete') {
    finishLoader();
  } else {
    window.addEventListener('load', finishLoader, { once: true });
  }

  const menuButton = document.querySelector('.menu');
  const mobileMenu = document.querySelector('.menu-drawer');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu?.classList.toggle('is-open', !isOpen);
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const prepareEnquiry = (enquiryForm) => {
    const formStatus = enquiryForm.querySelector('.form-status');
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!enquiryForm.checkValidity()) {
        enquiryForm.reportValidity();
        return;
      }
      const fields = new FormData(enquiryForm);
      const subject = `Stayro Max project enquiry — ${fields.get('project')}`;
      const body = [`Name: ${fields.get('name')}`, `Email: ${fields.get('email')}`, `Project type: ${fields.get('project')}`, '', 'Requirement:', fields.get('message')].join('\n');
      if (formStatus) formStatus.textContent = 'Opening your email app with this enquiry…';
      window.location.href = `mailto:info@stayromax.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  };
  document.querySelectorAll('#enquiry-form, .enquiry').forEach(prepareEnquiry);
  const revealTargets = document.querySelectorAll('main > section:not(.hero):not(.index), .resource, .principle');

  revealTargets.forEach((element) => element.classList.add('reveal'));

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }

  const hero = document.querySelector('.hero');
  if (hero && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty('--glow-x', `${x * 24}px`);
      hero.style.setProperty('--glow-y', `${y * 18}px`);
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--glow-x', '0px');
      hero.style.setProperty('--glow-y', '0px');
    });
  }

  const previewMode = new URLSearchParams(window.location.search).get('preview') === '1';
  const previewDirection = new URLSearchParams(window.location.search).get('direction');
  const directions = ['current', 'blueprint', 'gallery'];
  if (previewDirection && directions.includes(previewDirection)) document.body.dataset.direction = previewDirection;
  if (previewMode) {
    const switcher = document.createElement('aside');
    switcher.className = 'direction-switcher';
    switcher.setAttribute('aria-label', 'Design direction preview');
    switcher.innerHTML = '<span>Preview direction</span><div><button data-direction="current">Current</button><button data-direction="blueprint">Blueprint</button><button data-direction="gallery">Gallery</button></div>';
    document.body.append(switcher);
    const applyDirection = (direction) => {
      document.body.dataset.direction = direction === 'current' ? '' : direction;
      const url = new URL(window.location.href);
      url.searchParams.set('preview', '1');
      if (direction === 'current') url.searchParams.delete('direction'); else url.searchParams.set('direction', direction);
      window.history.replaceState({}, '', url);
      switcher.querySelectorAll('button').forEach((button) => button.classList.toggle('is-selected', button.dataset.direction === direction));
    };
    switcher.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => applyDirection(button.dataset.direction)));
    applyDirection(directions.includes(previewDirection) ? previewDirection : 'current');
  }

  const concept = new URLSearchParams(window.location.search).get('concept');
  const concepts = ['sectional', 'index', 'fieldwork', 'atlas', 'lumora', 'lumora2'];
  if (concepts.includes(concept)) {
    document.body.classList.add('concept-preview');
    const conceptPages = {
      sectional: '<main class="concept sectional"><header><a href="/">STAYRO MAX</a><span>01— MATERIAL SYSTEMS</span><a href="/contact.html">ENQUIRE ↗</a></header><section class="sectional-hero"><p>CONSEQUENTIAL SPACES / 2026</p><h1>The material<br>is the <em>first drawing.</em></h1><div class="sectional-object"><i>EPS</i><i>XPS</i><b>SECTION / 01</b></div><a class="concept-link" href="/products.html">Read the system index ↘</a></section><section class="sectional-band"><b>01 / DEFINE</b><p>Thermal · weight · moisture · pressure · time · transport</p><b>02 / MAKE</b><p>Specification support · manufacturing · custom fabrication</p></section></main>',
      index: '<main class="concept matter-index"><header><a href="/">STAYRO MAX</a><span>THE MATERIAL INDEX</span><a href="/contact.html">START A PROJECT ↗</a></header><section class="index-lead"><p>NOT A PRODUCT CATALOGUE</p><h1>Choose the<br><em>constraint.</em></h1><p>Start with what the project must withstand, then find the system that belongs there.</p></section><section class="index-grid"><a href="/products/eps.html"><small>01</small>Expanded<br>Polystyrene <i>EPS</i></a><a href="/products/xps.html"><small>02</small>Extruded<br>polystyrene <i>XPS</i></a><a href="/products/epp.html"><small>03</small>Impact-ready<br>components <i>EPP</i></a><a href="/products.html"><small>04—07</small>View the full<br>material index <i>↗</i></a></section></main>',
      fieldwork: '<main class="concept fieldwork"><header><a href="/">STAYRO MAX</a><span>FIELDWORK / EASTERN PROVINCE</span><a href="/contact.html">LET’S TALK ↗</a></header><section class="field-title"><p>A COMPANY OF ALSHARQ</p><h1>What sits beneath<br>the surface <em>changes it.</em></h1></section><article class="field-story"><span>01 / THE REQUIREMENT</span><h2>Heat is not a detail.</h2><p>Start the conversation with the condition, not the product. We work from the physical reality of the project.</p></article><article class="field-story dark"><span>02 / THE RESPONSE</span><h2>Systems shaped around the actual brief.</h2><a href="/products.html">Explore material systems ↗</a></article></main>',
      atlas: '<main class="concept signal-atlas"><header><a href="/">STAYRO MAX</a><span>SIGNAL ROOM / MATERIAL ATLAS</span><a href="/contact.html">OPEN A BRIEF ↗</a></header><section class="atlas-stage"><div class="atlas-title"><p>BEGIN WITH THE CONDITION</p><h1>Find what<br><em>holds.</em></h1><a href="/products.html">Enter the material index ↘</a></div><div class="atlas-map" aria-label="Material conditions map"><span class="heat">HEAT</span><span class="weight">WEIGHT</span><span class="water">MOISTURE</span><span class="impact">IMPACT</span><a href="/products/eps.html" class="node eps-node">EPS<small>thermal</small></a><a href="/products/xps.html" class="node xps-node">XPS<small>ground</small></a><a href="/products/epp.html" class="node epp-node">EPP<small>impact</small></a><b>PROJECT CONDITIONS → MATERIAL RESPONSE</b></div></section><section class="atlas-foot"><span>01 / READ THE CONDITION</span><span>02 / SELECT THE SYSTEM</span><span>03 / MAKE IT FIT</span></section></main>',
      lumora: '<main class="concept lumora-stayro"><header><a href="/">STAYRO <i>MAX</i></a><nav><a href="#work">Systems</a><a href="#services">Capabilities</a><a href="/contact.html">Contact ↗</a></nav></header><section class="l-hero"><div class="l-watermark">STAYRO</div><div class="l-copy"><p>● MATERIAL SYSTEMS / EASTERN PROVINCE</p><h1>Made for the<br><em>actual brief.</em></h1><p>Performance-led insulation, formed systems and protective packaging for consequential spaces.</p><a href="#work">Explore systems <b>→</b></a></div><div class="l-object"><span>EPS / 01</span><i></i><i></i><small>MOVE TO REVEAL<br>THE MATERIAL STUDY</small></div></section><section class="l-about"><p>Stayro Max makes the material decision clearer—working from the conditions of the project, then shaping a system to respond.</p></section><section class="l-band"><b>WE</b><b>MAKE</b><b>→</b><b>IT FIT</b></section><section id="work" class="l-work"><p>01 / MATERIAL SYSTEMS</p><div><a href="/products/eps.html">Expanded<br>Polystyrene <span>EPS</span></a><a href="/products/xps.html">Extruded<br>polystyrene <span>XPS</span></a><a href="/products/epp.html">Impact-ready<br>components <span>EPP</span></a><a href="/products.html">View all<br>systems <span>↗</span></a></div></section><section id="services" class="l-services"><p>02 / HOW WE WORK</p><a href="/contact.html"><small>01</small>Specification support <span>↗</span></a><a href="/contact.html"><small>02</small>Custom fabrication <span>↗</span></a><a href="/contact.html"><small>03</small>Delivery coordination <span>↗</span></a></section><section class="l-proof"><p>THE WORK BEGINS WITH THE CONSTRAINT.</p><h2>Material intelligence that holds its value long after installation.</h2><div><b>01</b><span>Condition first</span><b>07</b><span>Systems indexed</span><b>24/7</b><span>Project thinking</span></div></section><footer><h2>Bring us the constraint.<br><em>We will help find the system.</em></h2><a href="/contact.html">Start a project ↗</a></footer></main>',
      lumora2: '<main class="concept l2"><header><a href="/">✦ STAYRO MAX</a><nav>Systems　 Approach　 Resources　 <a href="/contact.html">Menu +</a></nav></header><section class="l2hero"><div class="l2bg"></div><div class="l2copy"><span>● A COMPANY OF ALSHARQ</span><h1>Material choices,<br><em>made clear.</em></h1><p>For projects where the material changes everything that follows.</p><a href="/contact.html">Start a project <b>↗</b></a><a class="outline" href="/products.html">View systems</a></div><aside>01 / MATERIAL STUDY<br><br>EPS — XPS — EPP</aside></section><section class="l2about">We build the systems that sit beneath performance: insulation, formed elements and protection shaped around the real brief.</section><section class="l2cards"><a href="/products/eps.html">01<br><strong>EPS</strong><small>Expanded polystyrene</small></a><a href="/products/xps.html">02<br><strong>XPS</strong><small>Extruded polystyrene</small></a><a href="/products/epp.html">03<br><strong>EPP</strong><small>Expanded polypropylene</small></a></section><section class="l2dark"><span>THE STAYRO MAX APPROACH</span><h2>Start with the condition.<br>Then make the system fit.</h2><div>Specification support　•　Custom fabrication　•　Delivery coordination</div></section><footer><h2>Bring us the constraint.<br><em>We will help find the system.</em></h2></footer></main>'
    };
    const styles = document.createElement('style');
    styles.textContent = `.concept-preview>.site-header,.concept-preview>#main,.concept-preview>footer,.concept-preview>.mobile-menu-native,.concept-preview>.site-loader{display:none}.concept{min-height:100vh;color:#142b43;background:#f5f3ef;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif}.concept header{height:68px;padding:0 3.5vw;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid currentColor;font-size:10px;letter-spacing:.08em}.concept header a{font-weight:700;text-decoration:none;color:inherit}.concept h1,.concept h2,.concept p{margin:0}.sectional{background:#e9eff0;color:#16384c}.sectional-hero{position:relative;min-height:72vh;padding:6vw 3.5vw;overflow:hidden}.sectional-hero>p,.field-title p,.index-lead>p{font-size:10px;letter-spacing:.12em}.sectional h1{position:relative;z-index:2;margin-top:5vw;font-size:clamp(64px,10vw,160px);line-height:.79;letter-spacing:-.09em;font-weight:500}.sectional h1 em,.matter-index em,.fieldwork em{font-family:Georgia,serif;font-weight:400}.sectional-object{position:absolute;right:9%;top:10%;width:min(42vw,560px);aspect-ratio:1;border:1px solid #16384c;border-radius:50%;display:grid;place-items:center;transform:rotate(-12deg)}.sectional-object:before{content:'';position:absolute;width:48%;height:72%;background:#d97a57;transform:skewY(-18deg);box-shadow:40px 0 #d9e6e8}.sectional-object i,.sectional-object b{position:absolute;font-style:normal;font-size:10px;letter-spacing:.1em}.sectional-object i:first-of-type{top:22%;left:14%}.sectional-object i:nth-of-type(2){right:16%;bottom:24%}.sectional-object b{bottom:8%;left:42%}.concept-link{position:absolute;bottom:8%;left:3.5%;font-size:13px;color:inherit}.sectional-band{display:grid;grid-template-columns:150px 1fr 150px 1fr;gap:20px;padding:26px 3.5vw;border-top:1px solid #16384c;font-size:12px}.sectional-band p{color:#4d6876}.matter-index{color:#fff;background:#1d2631;padding-bottom:7vw}.matter-index header{border-color:#ffffff55}.index-lead{padding:8vw 4vw 5vw;display:grid;grid-template-columns:1fr 1.3fr;gap:6vw;align-items:end}.index-lead h1{font-size:clamp(64px,11vw,170px);line-height:.76;letter-spacing:-.1em;font-weight:500}.index-lead>p:last-child{max-width:290px;font-size:14px;line-height:1.6;color:#c4d1d1}.index-grid{display:grid;grid-template-columns:repeat(4,1fr);padding:0 4vw;border-top:1px solid #ffffff55}.index-grid a{min-height:310px;padding:20px;border-right:1px solid #ffffff55;color:inherit;text-decoration:none;font-size:clamp(24px,3vw,46px);line-height:.92;letter-spacing:-.06em;position:relative}.index-grid a:hover{background:#d97a57}.index-grid small,.index-grid i{position:absolute;font-size:10px;letter-spacing:.1em;font-style:normal}.index-grid small{top:20px;left:20px}.index-grid i{bottom:20px;right:20px}.fieldwork{color:#35281f;background:#f1e7da;min-height:100vh}.field-title{padding:10vw 9vw 13vw;max-width:1100px}.field-title h1{margin-top:25px;font-size:clamp(60px,9vw,145px);line-height:.84;letter-spacing:-.09em;font-weight:500}.field-story{padding:7vw 9vw;display:grid;grid-template-columns:170px 1fr 300px;gap:30px;border-top:1px solid #35281f}.field-story span{font-size:10px;letter-spacing:.1em}.field-story h2{font-size:clamp(36px,5vw,70px);line-height:.9;letter-spacing:-.07em;font-weight:500}.field-story p{font-size:15px;line-height:1.65}.field-story.dark{background:#35281f;color:#f1e7da}.field-story a{align-self:end;color:inherit;font-size:13px}@media(max-width:760px){.concept header{padding:0 18px;font-size:8px}.concept header span{display:none}.sectional-hero{min-height:690px;padding:54px 22px}.sectional h1{margin-top:50px;font-size:clamp(58px,16vw,88px)}.sectional-object{width:70vw;right:5%;top:42%;}.sectional-band,.index-lead,.field-story{display:block;padding:34px 22px}.sectional-band>*{display:block;margin:0 0 12px}.index-lead h1{margin:40px 0;font-size:clamp(60px,17vw,88px)}.index-grid{grid-template-columns:1fr 1fr;padding:0}.index-grid a{min-height:200px;font-size:29px}.field-title{padding:80px 22px}.field-title h1{font-size:clamp(56px,16vw,84px)}.field-story>*{display:block;margin-bottom:22px}}`;
    document.head.append(styles);
    if (concept === 'lumora2') { const s=document.createElement('style');s.textContent=`.l2{background:#fff;color:#2e3192}.l2 header{position:absolute;z-index:3;width:100%;border:0}.l2hero{min-height:100vh;position:relative;overflow:hidden}.l2bg{position:absolute;inset:0;background:linear-gradient(120deg,#dbeff9,#fff 49%,#c6e9fa)}.l2bg:after{content:'';position:absolute;right:12%;top:17%;width:36vw;aspect-ratio:1;border:1px solid #42ade2;border-radius:50%;box-shadow:0 0 0 5vw #42ade212}.l2copy{position:absolute;z-index:2;left:8%;top:27%;max-width:660px}.l2copy span, .l2dark span{font-size:10px;letter-spacing:.12em}.l2copy h1{margin:24px 0;font-size:clamp(56px,7vw,118px);line-height:.86;letter-spacing:-.08em;font-weight:500}.l2copy em, .l2 footer em{font-family:Georgia,serif;color:#42ade2;font-weight:400}.l2copy p{max-width:340px;color:#596887;line-height:1.7}.l2copy a{display:inline-block;margin:32px 10px 0 0;padding:14px 19px;border-radius:999px;background:#2e3192;color:#fff;text-decoration:none;font-size:12px}.l2copy .outline{border:1px solid #a9d1e5;background:transparent;color:#2e3192}.l2hero aside{position:absolute;z-index:2;right:5%;bottom:8%;font-size:10px;letter-spacing:.12em;color:#596887}.l2about{padding:11vw 15%;font-size:clamp(30px,4vw,64px);line-height:1.03;letter-spacing:-.06em}.l2cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#bfdff0}.l2cards a{min-height:370px;padding:28px;background:#edf6fb;color:#2e3192;text-decoration:none;font-size:10px;letter-spacing:.1em}.l2cards strong{display:block;margin-top:110px;font-size:clamp(50px,7vw,100px);letter-spacing:-.1em}.l2cards small{display:block;margin-top:18px;color:#596887}.l2cards a:nth-child(2){background:#2e3192;color:#fff}.l2cards a:nth-child(2) small{color:#a1d6f0}.l2dark{padding:10vw 8%;background:#2e3192;color:#fff}.l2dark h2{margin:25px 0 70px;font-size:clamp(42px,6vw,90px);line-height:.88;letter-spacing:-.08em;font-weight:500}.l2dark div{color:#dbeff9;font-size:13px}.l2 footer{background:#111a76;color:#fff;padding:9vw 8%}.l2 footer h2{font-size:clamp(42px,6vw,90px);line-height:.88;letter-spacing:-.08em;font-weight:500}@media(max-width:760px){.l2 header nav{display:none}.l2copy{left:7%;right:7%;top:22%}.l2copy h1{font-size:clamp(58px,16vw,86px)}.l2bg:after{width:78vw;right:-8%;top:54%}.l2cards{grid-template-columns:1fr}.l2cards a{min-height:220px}.l2cards strong{margin-top:50px}.l2about,.l2dark,.l2 footer{padding:19vw 7%}}`;document.head.append(s);}
    if (concept === 'lumora') {
      const lumoraStyles = document.createElement('style');
      lumoraStyles.textContent = `.lumora-stayro{background:#fcfdfe;color:#2e3192}.lumora-stayro header{position:absolute;inset:0 0 auto;z-index:3;border:0;color:#2e3192}.lumora-stayro header i{color:#42ade2;font-style:normal}.lumora-stayro nav{display:flex;gap:24px}.lumora-stayro nav a{font-size:11px}.l-hero{min-height:100vh;position:relative;overflow:hidden;background:linear-gradient(135deg,#edf6fb 0%,#fcfdfe 54%,#d9effa 100%)}.l-watermark{position:absolute;left:0;right:0;bottom:-3vw;text-align:center;font-size:clamp(130px,23vw,380px);font-weight:700;letter-spacing:-.12em;color:#2e31920a}.l-copy{position:absolute;z-index:2;left:7%;top:27%;max-width:500px}.l-copy p{font-size:12px;line-height:1.65;color:#596887}.l-copy>p:first-child{font-size:10px;letter-spacing:.1em;color:#5a2f83}.l-copy h1{margin:24px 0;font-size:clamp(56px,7vw,112px);font-weight:500;letter-spacing:-.08em;line-height:.85}.l-copy h1 em,footer em{font-family:Georgia,serif;color:#42ade2;font-weight:400}.l-copy a,footer a{display:inline-flex;margin-top:30px;padding:13px 18px;border-radius:999px;background:#2e3192;color:#fff;font-size:12px;text-decoration:none}.l-copy b{margin-left:18px}.l-object{position:absolute;right:9%;top:18%;width:min(39vw,520px);aspect-ratio:1;border:1px solid #42ade280;border-radius:50%;display:grid;place-items:center}.l-object:before{content:'';position:absolute;width:66%;height:52%;background:repeating-radial-gradient(circle at 40% 30%,#fff 0 1px,transparent 1.6px 6px),#eaf6fb;transform:rotate(-18deg);box-shadow:34px 34px 0 #42ade2}.l-object i{position:absolute;width:54%;height:54%;border:1px solid #2e319255;border-radius:50%}.l-object i:nth-of-type(2){width:78%;height:78%;border-color:#42ade244}.l-object span,.l-object small{position:absolute;font-size:10px;letter-spacing:.12em}.l-object span{top:14%;left:8%}.l-object small{bottom:10%;right:-4%;color:#596887}.l-about{padding:12vw 13%;font-size:clamp(30px,4vw,62px);line-height:1.05;letter-spacing:-.06em}.l-about p{max-width:20ch}.l-band{display:grid;grid-template-columns:repeat(4,1fr);border-block:1px solid #bfdff0}.l-band b{padding:28px;border-right:1px solid #bfdff0;font-size:clamp(26px,4vw,56px);letter-spacing:-.08em}.l-work,.l-services{padding:9vw 7%;background:#edf6fb}.l-work>p,.l-services>p{font-size:10px;letter-spacing:.12em}.l-work>div{margin-top:45px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.l-work a{min-height:280px;padding:22px;background:#fff;color:#2e3192;font-size:clamp(24px,3vw,43px);line-height:.9;letter-spacing:-.06em;text-decoration:none;position:relative}.l-work a:hover{background:#2e3192;color:#fff}.l-work span{position:absolute;left:22px;bottom:20px;font-size:10px;letter-spacing:.1em}.l-services{background:#fcfdfe}.l-services a{display:grid;grid-template-columns:80px 1fr auto;padding:27px 0;border-bottom:1px solid #bfdff0;color:inherit;text-decoration:none;font-size:clamp(25px,4vw,58px);letter-spacing:-.07em}.l-services small{font-size:10px;letter-spacing:.1em}.l-proof{padding:10vw 7%;background:#2e3192;color:#fff}.l-proof>p{font-size:10px;letter-spacing:.12em;color:#a1d6f0}.l-proof h2{max-width:15ch;margin:22px 0 70px;font-size:clamp(36px,5vw,76px);line-height:.94;letter-spacing:-.07em;font-weight:500}.l-proof div{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.l-proof b{font-size:clamp(28px,4vw,56px)}.l-proof span{align-self:end;color:#dbeff9;font-size:12px}footer{padding:10vw 7%;background:#111a76;color:#fff}footer h2{font-size:clamp(42px,6vw,90px);line-height:.88;letter-spacing:-.08em;font-weight:500}@media(max-width:760px){.lumora-stayro nav{display:none}.l-copy{left:7%;right:7%;top:19%}.l-copy h1{font-size:clamp(60px,17vw,85px)}.l-object{width:76vw;right:7%;top:52%}.l-band,.l-work>div{grid-template-columns:1fr 1fr}.l-band b{padding:18px}.l-work,.l-services,.l-proof,footer{padding:19vw 7%}.l-work a{min-height:180px;padding:15px}.l-proof div{grid-template-columns:1fr 1fr}.l-proof span{margin-bottom:24px}}`;
      document.head.append(lumoraStyles);
    }
    if (concept === 'atlas') {
      const atlasStyles = document.createElement('style');
      atlasStyles.textContent = `.signal-atlas{background:#061f30;color:#dceff4}.signal-atlas header{border-color:#83b9c733}.atlas-stage{min-height:calc(100vh - 68px);display:grid;grid-template-columns:.8fr 1.2fr;position:relative}.atlas-title{padding:9vw 5vw;display:flex;flex-direction:column;align-items:flex-start;justify-content:center}.atlas-title p{font-size:10px;letter-spacing:.14em;color:#80ced6}.atlas-title h1{margin:24px 0 46px;font-size:clamp(68px,10vw,155px);line-height:.76;letter-spacing:-.1em;font-weight:500}.atlas-title h1 em{font-family:Georgia,serif;font-weight:400;color:#f2784b}.atlas-title a{color:inherit;font-size:12px}.atlas-map{position:relative;overflow:hidden;border-left:1px solid #83b9c733;background:linear-gradient(#83b9c714 1px,transparent 1px),linear-gradient(90deg,#83b9c714 1px,transparent 1px);background-size:52px 52px}.atlas-map:before,.atlas-map:after{content:'';position:absolute;border:1px solid #83b9c755;border-radius:50%}.atlas-map:before{width:64%;aspect-ratio:1;left:18%;top:15%;box-shadow:0 0 0 75px #83b9c707}.atlas-map:after{width:30%;aspect-ratio:1;left:37%;top:32%;border-color:#f2784b}.atlas-map span{position:absolute;font-size:9px;letter-spacing:.16em;color:#80ced6}.heat{left:12%;top:18%}.weight{right:10%;top:29%}.water{left:18%;bottom:18%}.impact{right:12%;bottom:12%}.node{position:absolute;z-index:2;display:grid;place-items:center;width:94px;aspect-ratio:1;border:1px solid currentColor;border-radius:50%;background:#061f30;color:#dceff4;text-decoration:none;font-size:18px;letter-spacing:-.06em;transition:.25s}.node small{font-size:8px;letter-spacing:.1em;color:#80ced6}.node:hover{transform:scale(1.15);background:#f2784b;color:#061f30}.eps-node{left:28%;top:28%}.xps-node{right:22%;top:43%;width:125px}.epp-node{left:42%;bottom:18%;width:78px}.atlas-map>b{position:absolute;bottom:6%;left:8%;font-size:9px;letter-spacing:.12em;color:#80ced6}.atlas-foot{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #83b9c733}.atlas-foot span{padding:22px 5vw;border-right:1px solid #83b9c733;font-size:9px;letter-spacing:.12em}@media(max-width:760px){.atlas-stage{grid-template-columns:1fr}.atlas-title{min-height:48vh;padding:64px 22px}.atlas-title h1{font-size:clamp(68px,20vw,100px)}.atlas-map{min-height:52vh;border-left:0;border-top:1px solid #83b9c733}.atlas-foot span{padding:18px 12px;font-size:8px}.eps-node{left:20%;top:20%}.xps-node{right:16%;top:37%}.epp-node{left:42%;bottom:13%}}`;
      document.head.append(atlasStyles);
    }
    document.body.insertAdjacentHTML('beforeend', conceptPages[concept]);
  }
})();
(() => {
  const path = location.pathname, root = path.includes('/products/') ? '../' : '';
  const sheet = document.createElement('link'); sheet.rel = 'stylesheet'; sheet.href = root + 'multipage.css'; document.head.append(sheet);
  const list = [['eps.html','Expanded Polystyrene'],['xps.html','Extruded polystyrene'],['epp.html','EPP components'],['eifs.html','EIFS systems'],['geofoam.html','EPS geofoam'],['profiles.html','Architectural profiles'],['packaging.html','Protective packaging']];
  const products = list.map(item => '<a href="' + root + 'products/' + item[0] + '">' + item[1] + '</a>').join('');
  const pendingHeader = document.querySelector('[data-header]');
  if (pendingHeader) { pendingHeader.className = 'site-header'; pendingHeader.innerHTML = '<a class="brand" href="' + root + 'index.html"><img class="logo" src="' + root + 'alsharq-logo.svg" alt="Alsharq"><span class="brand-lockup"><b>Stayro Max</b><small>Material systems</small></span></a><nav class="nav" aria-label="Primary navigation"></nav><details class="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav class="mobile-drawer" aria-label="Mobile navigation"></nav></details>'; }
  const pendingFooter = document.querySelector('[data-footer]');
  if (pendingFooter) pendingFooter.innerHTML = '<div class="footer-top"><img class="footer-logo" src="' + root + 'alsharq-logo.svg" alt="Alsharq"><div class="footer-info"><div><b>CONTACT</b><a href="mailto:info@stayromax.com">info@stayromax.com</a><br><a href="tel:+966507624627">+966 50 762 4627</a></div><div><b>VISIT</b>Dammam, Eastern Province<br>Saudi Arabia</div></div></div><div class="legal"><span>© 2026 AL SHARQ · STAYRO MAX. ALL RIGHTS RESERVED.</span><span><a href="' + root + 'privacy.html">Privacy</a> · <a href="' + root + 'terms.html">Terms</a></span></div>';
  const nav = document.querySelector('.nav');
  if (nav) nav.innerHTML = '<details class="products-dropdown"><summary>Products</summary><div class="products-popover">' + products + '</div></details><a href="' + root + 'applications.html">Applications</a><a href="' + root + 'technical-library.html">Technical library</a><a href="' + root + 'about.html">About</a><a class="contact" href="' + root + 'contact.html">START A CONVERSATION ↗</a>';
  const mobile = document.querySelector('.mobile-drawer');
  if (mobile) mobile.innerHTML = '<a href="' + root + 'index.html">Home</a><a href="' + root + 'products.html">Products</a><div class="mobile-product-list">' + products + '</div><a href="' + root + 'applications.html">Applications</a><a href="' + root + 'technical-library.html">Technical library</a><a href="' + root + 'about.html">About</a><a href="' + root + 'contact.html">Start a conversation ↗</a><p class="menu-note">Stayro Max · A company of Alsharq</p>';
  document.querySelectorAll('.index-list a').forEach((link, index) => { if (list[index]) link.href = root + 'products/' + list[index][0]; });
  document.querySelectorAll('.resource').forEach(link => link.href = root + 'technical-library.html');
  const legal = document.querySelector('.legal span:last-child'); if (legal) legal.innerHTML = '<a href="' + root + 'privacy.html">Privacy</a> · <a href="' + root + 'terms.html">Terms</a>';
  document.querySelectorAll('input[name="email"]').forEach((input) => {
    const label = input.closest('label');
    if (label?.firstChild) label.firstChild.textContent = 'Email';
  });
  const renames = {'EPS insulation':'Expanded Polystyrene','XPS boards':'Extruded polystyrene','EPS insulation.':'Expanded Polystyrene.','XPS boards.':'Extruded polystyrene.'};
  document.querySelectorAll('h1,h2,option').forEach(node => { const text = node.textContent.trim(); if (renames[text]) node.textContent = renames[text]; });
  document.querySelectorAll('p').forEach(node => { node.textContent = node.textContent.replace('Extruded polystyrene board systems.', 'Extruded polystyrene material systems.'); });
  if (document.title === 'EPS insulation — Stayro Max') document.title = 'Expanded Polystyrene — Stayro Max';
  if (document.title === 'XPS boards — Stayro Max') document.title = 'Extruded polystyrene — Stayro Max';

  const requestedSystem = new URLSearchParams(window.location.search).get('system');
  const projectField = document.querySelector('select[name="project"]');
  if (projectField?.closest('#enquiry-form')) {
    ['EIFS systems', 'EPS geofoam', 'Architectural profiles'].forEach((system) => {
      if (![...projectField.options].some((option) => option.textContent.trim() === system)) {
        const option = new Option(system, system);
        projectField.add(option, projectField.options.length - 2);
      }
    });
  }
  if (requestedSystem && projectField && [...projectField.options].some((option) => option.value === requestedSystem)) {
    projectField.value = requestedSystem;
  }
  document.querySelectorAll('a.request[href$="contact.html"]').forEach((link) => {
    const productName = document.querySelector('h1')?.textContent.trim().replace(/[.?!]+$/, '');
    if (productName) link.href = `${link.href}?system=${encodeURIComponent(productName)}`;
  });
  document.querySelectorAll('details').forEach((details) => details.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      details.open = false;
      details.querySelector('summary')?.focus();
    }
  }));
})();
