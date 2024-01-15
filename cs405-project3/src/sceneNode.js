/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        
        var localTransformMatrix = this.trs.getTransformationMatrix();      
        var transformedModelMatrix = MatrixMult(modelMatrix, localTransformMatrix); 
        var transformedMvp = MatrixMult(mvp, localTransformMatrix);
        var transformNormalMatrix = MatrixMult(normalMatrix, localTransformMatrix);
        var transformedModelView = MatrixMult(modelView, localTransformMatrix);
        

        

        
        this.children.forEach(child => {
            child.draw(transformedMvp, transformedModelView, transformNormalMatrix, transformedModelMatrix);
        });

        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformNormalMatrix, transformedModelMatrix);
        }

    }

    

}