var pumpkinShape = new Shape();
pumpkinShape.vertices = [[702,192.000015258789],  [441,344],[348,560],[394,848],[625,1035],[856,1055],[962.499755859375,1039],[1151.5,1068.5],[1446,963.5],[1577.5,684.000732421875],[1503,382.000061035156],[1217,211.000030517578],[969.000610351563,226.000015258789]];
pumpkinShape.inTangents = [[161,-15.9999847412109],[39,-44],[6,-62],[-67,-123],[-41,-10],[-85,10],[0,0],[-111.5,-1.5],[-63,66.5],[-13.259521484375,147.327026367188],[37,51],[171,20.0000152587891],[0,0]];
pumpkinShape.outTangents = [[-161,15.9999847412109],[-39,44],[-6,62],[67,123],[41,10],[85,-10],[0,0],[111.5,1.5],[63,-66.5],[13.5,-150.000732421875],[-37,-51.0000610351563],[-171,-20.0000152587891],[0,0]];

var triangleShape = new Shape();
triangleShape.vertices = [[720,252.878051757813],[572.48779296875,532.09765625],[842.926818847656,532.09765625]];
triangleShape.inTangents = [[0,0],[0,0],[0,0]];
triangleShape.outTangents = [[0,0],[0,0],[0,0]];

var squareShape = new Shape();
squareShape.vertices = [[845,334.999969482422],[605,334.999969482422],[605,574.999938964844],[845,574.999938964844]];
squareShape.inTangents = [[0,0],[0,0],[0,0],[0,0]];
squareShape.outTangents = [[0,0],[0,0],[0,0],[0,0]];

var circleShape = new Shape();
circleShape.vertices = [[725,300],[595,429.999969482422],[725,559.999938964844],[855,429.999969482422]];
circleShape.inTangents = [[71.7969970703125,0],[0,-71.7970275878906],[-71.7969970703125,0],[0,71.7969665527344]];
circleShape.outTangents = [[-71.7969970703125,0],[0,71.7969665527344],[71.7969970703125,0],[0,-71.7970275878906]];

var hexagonShape = new Shape();

var eyeShapes = [triangleShape, squareShape, circleShape];
var eyeShapesNames = ["Triangle", "Square", "Circle"];

var frownShape = new Shape();
frownShape.vertices = [[969.999877929688,725],[615,840],[975,820],[1340,835]];
frownShape.inTangents = [[140.000122070313,0],[35,-25],[-115,5],[30,30]];
frownShape.outTangents = [[-140.000122070313,0],[-35,25],[115,-5],[-30,-30]];

var scaryShape = new Shape();
scaryShape.vertices = [[895,745],[795,870],[755,755],[620,895],[654,939],[804,909],[810,966],[942,903],[960,966],[1041,924],[1137,1005],[1200,890],[1135,770],[1030,855],[1010.00006103516,750],[930,830]];
scaryShape.inTangents = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
scaryShape.outTangents = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

var smileShape = new Shape();
smileShape.vertices = [[948,753],[621,792],[960,909],[1272,780]];
smileShape.inTangents = [[84,-3],[0,0],[-111,3],[0,0]];
smileShape.outTangents = [[-84,3],[0,0],[111,-3],[0,0]];

var mouthShapes = [frownShape, scaryShape, smileShape];
var mouthShapesNames = ["Frown", "Scary", "Smile"];

var mainWindow = new Window("palette", "Pumpkin Generator", undefined);
mainWindow.orientaiton = "column";

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
var eyesText = groupOne.add("statictext", undefined, "Eyes");
eyesText.size = [65, 25];
var eyesDD = groupOne.add("dropdownlist", undefined, eyeShapesNames);
eyesDD.size = [100, 25];
eyesDD.selection = 0;

var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var mouthText = groupTwo.add("statictext", undefined, "Mouth");
mouthText.size = [65, 25];
var mouthDD = groupTwo.add("dropdownlist", undefined, mouthShapesNames);
mouthDD.size = [100, 25];
mouthDD.selection = 0;

var groupThree = mainWindow.add("group", undefined, "groupThree");
groupTwo.orientation = "row";
var glowText = groupThree.add("statictext", undefined, "Glow");
glowText.size = [50, 25];
var glowSlider = groupThree.add("slider", undefined, "");
glowSlider.minValue = 0;
glowSlider.maxValue = 100;
glowSlider.value = 20;
glowSlider.size = [80, 25];
var glowSliderText = groupThree.add("statictext", undefined, "20");
glowSliderText.size = [20, 25];
glowSliderText.characters = 3;

glowSlider.onChange = function() {
        glowSliderText.text = Math.floor(glowSlider.value.toString());
    }

var generateButton = mainWindow.add("button", undefined, "Generate");

mainWindow.center();
mainWindow.show();

generateButton.onClick = function() {
    var mask;
    app.beginUndoGroup("Pumpkin Generation");
        var comp = app.project.items.addComp("Pumpkin Comp", 1920, 1080, 1, 10, 30);
        
        var pumpkinBody = comp.layers.addSolid([1, .6118, 0], "Body", 1920, 1080, 1, 10);
        mask = pumpkinBody.Masks.addProperty("Mask");
        mask.property("Mask Path").setValue(pumpkinShape);
        var pumpkinEyes = comp.layers.addSolid([1, 1, 0], "Eyes", 1920, 1080, 1, 10);
        mask = pumpkinEyes.Masks.addProperty("Mask");
        mask.property("Mask Path").setValue(eyeShapes[eyesDD.selection.index]);
        
        var glowEffect = pumpkinEyes.Effects.addProperty("ADBE Glo2");
        glowEffect.property("Glow Radius").setValue(Math.floor(glowSlider.value));
        var duplicate = pumpkinEyes.duplicate();
        duplicate.property("Position").setValue(duplicate.property("Position").value+[470,0]);
        var pumpkinMouth = comp.layers.addSolid([1, 1, 0], "Mouth", 1920, 1080, 1, 10);
        mask = pumpkinMouth.Masks.addProperty("Mask");
        mask.property("Mask Path").setValue(mouthShapes[mouthDD.selection.index]);
        glowEffect = pumpkinMouth.Effects.addProperty("ADBE Glo2");
        glowEffect.property("Glow Radius").setValue(Math.floor(glowSlider.value));
        
        comp.openInViewer();
    app.endUndoGroup();
    }