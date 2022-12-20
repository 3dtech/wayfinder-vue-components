import { parseComponent } from '@vuedoc/parser';
import json2md from 'json2md';
import fs from 'fs';
import glob from 'glob';

const options = {
    filename: '../src/lib-components/GroupsMenu.vue',
};
const header = [
    { h1: "3D Wayfinder Vue2 components" }
];

let body = [];
let links = [];

json2md.converters.comptitle = (contents) => {
    return "## ["+contents+"](#"+contents+") ";
}

async function writeDoc ()  {
    let doc = [];
    doc = doc.concat(header);
    doc = doc.concat(links);
    doc = doc.concat({hr: ''});
    doc = doc.concat(body);
    let file = json2md(doc);

    fs.writeFile('../COMPONENTS.md', file, err => {
        console.error(err);
    })
}
function generate(comp) {
    let compDoc = [];
    let props = [];
    let events = [];
    let slots = [];

    links.push({
        link: {title: "WF" + comp.name, source: "#WF" + comp.name}
    })

    compDoc.push(
        {
            comptitle: "WF" + comp.name
        },
        {
            p: comp.description || ''
        }
    );

    comp.props.forEach((prop) => {
        if(prop && prop.visibility == 'public') {
            props.push(prop.name + " : " +  prop.type + " (" + prop.default + ")");
        }
    })

    comp.events.forEach((event) => {
        if(event && event.visibility == 'public') {
            let args = [];
            event.arguments.forEach(arg => {
                args.push(arg.name + ": " + arg.type)
            })
            events.push(event.name + " (" + args.join(",") + ")");
        }
    })

    comp.slots.forEach((slot) => {
        if(slot && slot.visibility == 'public') {
            slots.push(slot.name + " - " + (slot.description || ''));
        }
    })

    if (props && props.length > 0) {
        compDoc.push({h3: "Properties"});
        compDoc.push({ul: props})
    }

    if (events && events.length > 0) {
        compDoc.push({h3: "Events"});
        compDoc.push({ul: events})
    }

    if (slots && slots.length > 0) {
        compDoc.push({h3: "Slots"});
        compDoc.push({ul: slots})
    }

    body = body.concat(compDoc);
}

 function fromDir(startPath, filter) {
    glob(startPath + '/**/*' + filter, {}, async (err, files)=>{
        let component;
        for(let f in files) {
            component = await parseComponent({filename: files[f]})
            generate(component)
        }
        writeDoc();
    })
};

fromDir("../src/lib-components", ".vue");