import{o as n,c as a,a as s,b as t}from"./app.21b67795.js";const e='{"title":"Changing Configuration at Runtime","description":"","frontmatter":{},"relativePath":"guide/ioc/registration/changing-configuration-at-runtime.md","lastUpdated":1630569938701}',p={},o=t('<h1 id="changing-configuration-at-runtime"><a class="header-anchor" href="#changing-configuration-at-runtime" aria-hidden="true">#</a> Changing Configuration at Runtime</h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Don&#39;t do this, you&#39;ve been warned.</p></div><p>The Lamar team respectfully recommends that you don&#39;t do this, but this functionality is here because we had to have this for Jasper&#39;s integration with <a href="http://ASP.Net" target="_blank" rel="noopener noreferrer">ASP.Net</a> Core. Please note that this should only be used <strong>additively</strong>. Unlike StructureMap, Lamar will not rewrite build plans for existing registrations to accommodate changes here.</p>',3),c=t('<p><a id="snippet-sample_add_all_new_services"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">add_all_new_services</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name"><span class="token keyword">var</span></span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Container</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IWidget<span class="token punctuation">,</span> RedWidget<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    container<span class="token punctuation">.</span><span class="token function">Configure</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span> _<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddTransient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IService<span class="token punctuation">,</span> WhateverService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    container<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ShouldBeOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>WhateverService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar.Testing/IoC/Acceptance/configure_container.cs#L14-L25" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_add_all_new_services" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p>',3);p.render=function(t,e,p,i,u,l){return n(),a("div",null,[o,s(" snippet: sample_add_all_new_services "),c])};export{e as __pageData,p as default};
