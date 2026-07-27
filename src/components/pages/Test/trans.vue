<transition-group class="grid" :css="false" @enter="onEnter" @leave="onLeave">
   <div v-for="n in count" class="card" :key="n" ref="card" :data-index="n - 1">
       <h1>{{ n }}</h1>
   </div>
</transition-group>
