import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room{
    constructor() {
        this.experience = new Experience(); // Singleton
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;

         if (this.room && this.room.hasOwnProperty('scene')) {
             this.actualRoom = this.room.scene;
         } else {
             console.log('room or scene property not found')
         }
         //console.log(this.actualRoom);

        this.setModel();

    }

    setModel() {

          // if have children
          this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            // if child in groups
            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            if(child.name === "JungGlass"){       // See-through Glass setup
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            if(child.name === "VideoGlass"){  
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,      // screen is name in assets
                });
            }

            this.actualRoom.traverse((child) => {
                if (child.name === 'VideoGlass') {
                    child.material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen,      // screen is name in assets
                    });
                } 
              });
          });

          this.scene.add(this.actualRoom);
          // this.actualRoom.scale.set( 0.1, 0.1, 0.1 );
          //this.actualRoom.rotation.y = MATH.PI;      //   (correct axes if needed
    }

    resize() {

    }

    update() {

    }
}