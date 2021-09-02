import{o as n,c as s,a,b as e}from"./app.21b67795.js";const t='{"title":"Working with IConfiguredInstance","description":"","frontmatter":{},"headers":[{"level":2,"title":"Changing the Instance Lifecycle","slug":"changing-the-instance-lifecycle"},{"level":2,"title":"Reflecting over Constructor Parameters","slug":"reflecting-over-constructor-parameters"},{"level":2,"title":"Working with Inline Dependencies","slug":"working-with-inline-dependencies"}],"relativePath":"guide/ioc/registration/configured-instance.md","lastUpdated":1630569938705}',o={},c=e('<h1 id="working-with-iconfiguredinstance"><a class="header-anchor" href="#working-with-iconfiguredinstance" aria-hidden="true">#</a> Working with IConfiguredInstance</h1><p>The most common way for StructureMap to build or resolve a requested object is to build a concrete type directly by calling a public constructor function and optionally filling values in public setter properties. For this type of object construction, StructureMap exposes the <code>IConfiguredInstance</code> interface as a means of querying and modifying how a concrete type will be created or resolved. While the <a href="/guide/ioc/registration/registry-dsl.html">ServiceRegistry DSL</a> fluent interface provides the main way of explicitly configuring concrete type creation, the <code>IConfiguredInstance</code> interface is meant to support <a href="/guide/ioc/registration/auto-registration-and-conventions.html">conventional registration</a>, <a href="/guide/ioc/registration/attributes.html">configuration attributes</a>, and <a href="/guide/ioc/registration/policies.html">construction policies</a>.</p>',2),p=e('<p><a id="snippet-sample_iconfiguredinstance"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IConfiguredInstance</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// The constructor function that this registration is going to use to</span>\n    <span class="token comment">/// construct the object</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token return-type class-name">ConstructorInfo</span> Constructor <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    \n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// The service type that you can request. This would normally be an interface or other</span>\n    <span class="token comment">/// abstraction</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token return-type class-name">Type</span> ServiceType <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    \n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// The actual, concrete type</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token return-type class-name">Type</span> ImplementationType <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    \n    \n    <span class="token return-type class-name">ServiceLifetime</span> Lifetime <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    \n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// The instance name for requesting this object by name</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n\n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">///     Inline definition of a constructor dependency.  Select the constructor argument by type and constructor name.</span>\n    <span class="token comment">///     Use this method if there is more than one constructor arguments of the same type</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token comment">/// &lt;typeparam name=&quot;T&quot;&gt;&lt;/typeparam&gt;</span>\n    <span class="token comment">/// &lt;param name=&quot;constructorArg&quot;&gt;&lt;/param&gt;</span>\n    <span class="token comment">/// &lt;returns&gt;&lt;/returns&gt;</span>\n    <span class="token return-type class-name">DependencyExpression<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> <span class="token generic-method"><span class="token function">Ctor</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> constructorArg <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    \n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// Directly add or interrogate the inline dependencies for this instance</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token return-type class-name">IReadOnlyList<span class="token punctuation">&lt;</span>Instance<span class="token punctuation">&gt;</span></span> InlineDependencies <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n\n    <span class="token comment">/// &lt;summary&gt;</span>\n    <span class="token comment">/// Adds an inline dependency</span>\n    <span class="token comment">/// &lt;/summary&gt;</span>\n    <span class="token comment">/// &lt;param name=&quot;instance&quot;&gt;&lt;/param&gt;</span>\n    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddInline</span><span class="token punctuation">(</span><span class="token class-name">Instance</span> instance<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/Lamar/IoC/Instances/IConfiguredInstance.cs#L8-L56" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_iconfiguredinstance" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="changing-the-instance-lifecycle"><a class="header-anchor" href="#changing-the-instance-lifecycle" aria-hidden="true">#</a> Changing the Instance Lifecycle</h2><p>You can override the lifecycle of a single <code>IConfiguredInstance</code> by calling the <code>LifecycleIs()</code> methods and either supplying a type of <code>ILifecycle</code> or an <code>ILifecycle</code> object. As a quick helper, there are also extension methods for common lifecycles:</p>',5),i=e('<p><a id="snippet-sample_iconfiguredinstance-lifecycle"></a></p><div class="language-cs"><pre><code><span class="token class-name">IConfiguredInstance</span> instance\n    <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConfiguredInstance</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WidgetHolder</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Use the SingletonThing lifecycle</span>\ninstance<span class="token punctuation">.</span><span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// or supply an ILifecycle type</span>\ninstance<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">SetLifecycleTo</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ThreadLocalStorageLifecycle<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// or supply an ILifecycle object</span>\ninstance<span class="token punctuation">.</span><span class="token function">SetLifecycleTo</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Lifecycles_Samples<span class="token punctuation">.</span>MyCustomLifecycle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// or override to the default &quot;transient&quot; lifecycle</span>\ninstance<span class="token punctuation">.</span><span class="token function">DefaultLifecycle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/iconfigured_instance_behavior.cs#L29-L44" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_iconfiguredinstance-lifecycle" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><h2 id="reflecting-over-constructor-parameters"><a class="header-anchor" href="#reflecting-over-constructor-parameters" aria-hidden="true">#</a> Reflecting over Constructor Parameters</h2><p>To find the constructor function parameters of an <code>IConfiguredInstance</code>, just use this syntax (it&#39;s just .Net Reflection):</p>',5),l=e('<p><a id="snippet-sample_reflecting-over-parameters"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GuyWithArguments</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token function">GuyWithArguments</span><span class="token punctuation">(</span><span class="token class-name">IWidget</span> widget<span class="token punctuation">,</span> <span class="token class-name">Rule</span> rule<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Fact</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">reflecting_over_constructor_args</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token class-name">IConfiguredInstance</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SmartInstance<span class="token punctuation">&lt;</span>GuyWithArguments<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token comment">// I&#39;m just forcing it to assign the constructor function</span>\n        <span class="token punctuation">.</span><span class="token function">SelectConstructor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GuyWithArguments</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    instance<span class="token punctuation">.</span>Constructor<span class="token punctuation">.</span><span class="token function">GetParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">ShouldHaveTheSameElementsAs</span><span class="token punctuation">(</span><span class="token string">&quot;widget&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;rule&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/lamar/blob/master/src/StructureMap.Testing/Acceptance/iconfigured_instance_behavior.cs#L50-L69" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_reflecting-over-parameters" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><div class="tip custom-block"><p class="custom-block-title">INFO</p><p>The <a href="/guide/ioc/registration/constructor-selection.html">constructor function selection</a> process takes place as the very first step in creating a <a href="/guide/ioc/diagnostics/build-plans.html">build plan</a> and will be available in any kind of <a href="/guide/ioc/registration/policies.html">construction policy</a> or <a href="/guide/ioc/registration/attributes.html">configuration attribute</a> on parameters or properties.</p></div><h2 id="working-with-inline-dependencies"><a class="header-anchor" href="#working-with-inline-dependencies" aria-hidden="true">#</a> Working with Inline Dependencies</h2><p>The <code>IConfiguredInstance.InlineDependencies</code> property is a collection of <code>Instance</code> objects that model inline dependencies. A single <em>Instance</em> refers to a parameter in a constructor function:</p><p>When Lamar determines a <a href="/guide/ioc/diagnostics/build-plans.html">build plan</a> for a concrete type, it reflects over all the parameters in the chosen constructor function and then the settable properties looking for any explicitly configured dependencies by searching in order for:</p><ol><li>An exact match by dependency type and name</li><li>A partial match by dependency type only</li><li>A partial match by name only</li></ol><p>For primitive arguments like strings or numbers, the logic is to search first by name, then by type. All searching is done in the order that the inline <code>Instance</code> objects are registered, so do watch the order in which you add arguments. There is a method to insert new arguments at the front of the list if you need to do any kind of overrides of previous behavior.</p><p>See <a href="/guide/ioc/registration/inline-dependencies.html">inline dependencies</a> for more information about working with inline dependencies.</p>',10);o.render=function(e,t,o,r,u,k){return n(),s("div",null,[c,a(" snippet: sample_IConfiguredInstance "),p,a(" snippet: sample_iconfiguredinstance-lifecycle "),i,a(" snippet: sample_reflecting-over-parameters "),l])};export{t as __pageData,o as default};
