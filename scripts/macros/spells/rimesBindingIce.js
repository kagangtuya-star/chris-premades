import {chris} from '../../helperFunctions.js';
async function item({speaker, actor, token, character, item, args, scope, workflow}) {
    let animation = chris.getConfiguration(workflow.item, 'animation') ?? chris.jb2aCheck() === 'patreon';
    if (!animation) return;
    if (!workflow.templateId) return;
    let template = canvas.scene.collections.templates.get(workflow.templateId)?.object;
    if (!template) return;
    //Animations by: eskiemoh
    new Sequence()
        .effect()
        .atLocation(workflow.token)
        .file('jb2a.magic_signs.circle.02.evocation.loop.blue')
        .scaleToObject(1.25)
        .rotateIn(180, 600, {'ease': 'easeOutCubic'})
        .scaleIn(0, 600, {'ease': 'easeOutCubic'})
        .loopProperty('sprite', 'rotation', {'from': 0, 'to': -360, 'duration': 10000})
        .belowTokens()
        .fadeOut(2000)
        .zIndex(0)

        .effect()
        .atLocation(workflow.token)
        .file('jb2a.magic_signs.circle.02.evocation.loop.blue')
        .scaleToObject(1.25)
        .rotateIn(180, 600, {'ease': 'easeOutCubic'})
        .scaleIn(0, 600, {'ease': 'easeOutCubic'})
        .loopProperty('sprite', 'rotation', {'from': 0, 'to': -360, 'duration': 10000})
        .belowTokens(true)
        .filter('ColorMatrix', {'saturate': -1, 'brightness': 2})
        .filter('Blur', {'blurX': 5, 'blurY': 10 })
        .zIndex(1)
        .duration(1200)
        .fadeIn(200, {'ease': 'easeOutCirc', 'delay': 500})
        .fadeOut(300, {'ease': 'linear'})

        .effect()
        .file('jb2a.particles.outward.white.01.02')
        .scaleIn(0, 500, {'ease': 'easeOutQuint'})
        .delay(500)
        .fadeOut(1000)
        .atLocation(workflow.token)
        .duration(1000)
        .size(1.75, {'gridUnits': true})
        .animateProperty('spriteContainer', 'position.y', {'from': 0 , 'to': -0.5, 'gridUnits': true, 'duration': 1000})
        .zIndex(1)
        .waitUntilFinished(250)

        .effect()
        .file('jb2a.dancing_light.blueteal')
        .atLocation(workflow.token)
        .rotateTowards(template)
        .filter('ColorMatrix', {'hue': 10, 'saturate': -0.5, 'brightness': 1.5})
        .size(0.9 * workflow.token.document.width, {'gridUnits': true})
        .spriteScale({'x': 0.5, 'y': 1.0})
        .spriteOffset({'x': 0.25}, { 'gridUnits': true})
        .scaleIn(0, 500, {'ease': 'easeOutCubic'})
        .fadeIn(500)
        .fadeOut(1000)
        .duration(5000)

        .effect()
        .file('jb2a.extras.tmfx.border.circle.outpulse.01.fast')
        .atLocation(workflow.token)
        .rotateTowards(template)
        .size(0.9 * workflow.token.document.width, {'gridUnits': true})
        .spriteScale({'x': 0.5, 'y': 1.0})
        .spriteOffset({'x': 0.25}, {'gridUnits': true})

        .effect()
        .file('jb2a.particles.outward.white.02.03')
        .size({'width': 6, 'height': 6}, {'gridUnits': true})
        .atLocation(workflow.token, {'cacheLocation': true})
        .scaleIn(0, 1500, {'ease': 'easeOutSine'})
        .duration(1500)
        .delay(250)
        .fadeIn(250)
        .fadeOut(1250)
        .randomizeMirrorY()
        .moveTowards(template)
        .filter('ColorMatrix', {'hue': 10, 'saturate': -1, 'brightness': 2})
        .repeats(7,500,500)
        .zIndex(2)

        .effect()
        .file('jb2a.breath_weapons.poison.cone.blue')
        .size(6.5, {'gridUnits': true})
        .atLocation(workflow.token, {'cacheLocation': true})
        .rotateTowards(template, {'cacheLocation': true})
        .fadeIn(1100)
        .fadeOut(1100)
        .belowTokens()
        .opacity(0.8)
        .playbackRate(0.9)
        .filter('ColorMatrix', {'hue': 10, 'saturate': -1, 'brightness': 1.8})
        .startTime(3000)
        .duration(5000)
        .zIndex(1)

        .effect()
        .file('jb2a.breath_weapons.poison.cone.blue')
        .size(6.5, {'gridUnits': true})
        .atLocation(workflow.token, {'cacheLocation': true})
        .rotateTowards(template, {'cacheLocation': true})
        .mirrorY()
        .zIndex(1)
        .fadeOut(1100)
        .opacity(0.1)
        .playbackRate(0.9)
        .filter('ColorMatrix', {'saturate': -1, 'brightness': 1.1})
        .startTime(3000)

        .play();
}
async function freeze(target, name) {
    new Sequence()
        .effect()
        .delay(1250)
        .name(name)
        .file('jb2a.extras.tmfx.outflow.circle.02')
        .attachTo(target)
        .belowTokens()
        .scaleToObject(target.document.texture.scaleX * 1.55)
        .opacity(0.45)
        .scaleIn(0, 6000, {'ease': 'easeOutExpo'})
        .fadeIn(6000, {'delay': 1000, 'ease': 'easeOutExpo'})
        .persist()
        
        .effect()
        .delay(1250)
        .name(name)
        .file('jb2a.spirit_guardians.blue.particles')
        .attachTo(target)
        .scaleToObject(target.document.texture.scaleX * 1.3)
        .opacity(0.55)
        .filter('ColorMatrix', { 'saturate':  -0.35, 'brightness': 1.2})
        .scaleIn(0, 6000, {'ease': 'easeOutExpo'})
        .fadeIn(6000, {'delay': 1000, 'ease': 'easeOutExpo'})
        .persist()
        
        .effect()
        .delay(1250)
        .name(name)
        .file('jb2a.celestial_bodies.asteroid.single.ice.blue.02')
        .attachTo(target)
        .spriteOffset({'x': -0.05}, {'gridUnits': true})
        .scaleToObject(target.document.texture.scaleX * 1.5)
        .opacity(0.5)
        .scaleIn(0, 6000, {'ease': 'easeOutExpo'})
        .fadeIn(6000, {'delay': 1000, 'ease': 'easeOutExpo'})
        .randomRotation()
        .repeats(1,100,100)
        .noLoop()
        .persist()
        .endTime(19950)
        .filter('ColorMatrix', {'contrast':0})
        .shape('circle', {
            'lineSize': canvas.grid.size / 2.5,
            'lineColor': '#FF0000',
            'radius': 0.55,
            'gridUnits': true,
            'name': name,
            'isMask': true
        })
        .play();
}
async function unfreeze(token, name) {
    Sequencer.EffectManager.endEffects({'name': name, 'object': token});
    new Sequence()
        .effect()
        .file('jb2a.impact_themed.ice_shard.blue')
        .atLocation(token)
        .belowTokens()
        .scaleToObject(token.document.texture.scaleX*2)
        .play();
}
async function saves({speaker, actor, token, character, item, args, scope, workflow}) {
    let animation = chris.getConfiguration(workflow.item, 'animation') ?? chris.jb2aCheck() === 'patreon';
    if (!animation) return;
    if (!workflow.failedSaves.size) return;
    let targets = Array.from(workflow.failedSaves);
    targets.forEach(target => {  
        freeze(target, 'bindingIce');
    });
}
async function end(token, origin) {
    let animation = chris.getConfiguration(origin, 'animation') ?? chris.jb2aCheck() === 'patreon';
    if (!animation) return;
    await unfreeze(token, 'bindingIce');
}
export let rimesBindingIce = {
    'item': item,
    'saves': saves,
    'end': end,
    'freeze': freeze,
    'unFreeze': unfreeze
};