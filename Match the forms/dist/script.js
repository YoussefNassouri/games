const frame = new Frame("fit", 1024, 768, "#EEE", "#555");
frame.on("ready", () => {// ES6 Arrow Function - similar to function(){}
  zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

  // often need below - so consider it part of the template
  const stage = frame.stage;
  const stageW = frame.width;
  const stageH = frame.height;

  // REFERENCES for ZIM at https://zimjs.com
  // see https://zimjs.com/intro.html for an intro example
  // see https://zimjs.com/learn.html for video and code tutorials
  // see https://zimjs.com/docs.html for documentation
  // see https://codepen.io/topic/zim/ for ZIM on CodePen

  // CODE HERE

  pizzazz.makePattern("slants", series([grey, dark]), 20, 52, 40).
  alp(.2).
  center().
  noMouse();

  // we could use the type property of shape to do matching
  // but often, with matching there needs to be a unique
  // so we show how we can do that with a match property

  STYLE = {
    color: blue,
    borderColor: dark,
    borderWidth: 3,
    centerReg: { add: false },
    clone: false // important to keep custom match property when making Tile
  };

  // these are what we drag
  var objectsList = [
  new Rectangle(),
  new Circle(),
  new Triangle(110, 110, 110)];


  // these are what we drag to
  STYLE.color = pink;
  var targetsList = [
  new Rectangle(),
  new Circle(),
  new Triangle(110, 110, 110)];


  // set up the match
  loop(objectsList, function (obj, i) {
    obj.match = targetsList[i];
  });

  shuffleTargets();
  function shuffleTargets() {
    // stop lists from being the same
    var same = true;
    while (same) {
      // loop returns true if it makes it all the way
      same = loop(targetsList, function (obj, i) {
        // put false into same if shapes are different
        if (obj.type != objectsList[i].type) return false;
      });
      if (same) shuffle(targetsList);
    }
    // OR
    // // stop lists from having any object being in the same place
    // var same = true;
    // while (same) {
    //     shuffle(targetsList);
    //     // loop returns true if it makes it all the way
    //     var different = loop(targetsList, function (obj, i) {
    //         // put false into different if shapes are same
    //         if (obj.type == objectsList[i].type) return false;
    //     });
    //     if (different) same = false;
    // }
  }

  // tile the targets and objects
  var targets = new Tile(series(targetsList), 3, 1, 100).
  pos(0, 180, CENTER).
  alp(0).
  animate({
    wait: 500,
    props: { alpha: 1 } });

  var objects = new Tile(series(objectsList), 3, 1, 100).
  drag().
  pos(0, 130, CENTER, BOTTOM);

  STYLE = {};

  // Record start locations to snap back to
  objects.loop(function (obj) {
    obj.startX = obj.x;
    obj.startY = obj.y;
  });

  // Create the shape where we draw the line
  var shape = new Shape().addTo().ord(-1);

  // Record which shape has been picked up
  // This gets used in the Ticker
  var currentShape;
  objects.on("mousedown", function (e) {
    currentShape = e.target;
  });
  Ticker.add(function () {
    if (currentShape) {
      var obj = currentShape;
      // shape is on stage but objects are in tiles
      // so need to get global positions that match position in parent
      var point1 = obj.parent.localToGlobal(obj.startX, obj.startY);
      var point2 = obj.parent.localToGlobal(obj.x, obj.y);
      shape.c().s(red).ss(4).
      mt(point1.x, point1.y).
      lt(point2.x, point2.y);
    }
  });
  objects.on("pressup", function (e) {

    // Test to see if object is hitting target
    obj = e.target;
    if (obj.hitTestBounds(obj.match)) {// if match

      obj.loc(obj.match).noMouse(); // don't let user pick up object
      obj.match.removeFrom();
      emitter.loc(obj).spurt(10);
      shape.c();
      currentShape = null;

      if (targets.numChildren == 0) {// end game
        objects.animate({
          props: { scale: 1.5 },
          time: 200,
          rewind: true,
          loop: true,
          loopCount: 2,
          sequence: 100 });

        replay.addTo().alp(0).animate({
          wait: 1000,
          props: { alpha: 1 } });

      }

    } else {// snap back - no match

      objects.noMouse();
      obj.animate({
        props: { x: obj.startX, y: obj.startY },
        time: 500,
        ease: "elasticOut",
        call: function () {
          objects.mouse();
          currentShape = null;
        } });


    }
  });

  var emitter = new Emitter({ obj: new Circle(20, [pink, purple], dark), startPaused: true });

  var replay = new Button({
    label: "REPLAY",
    backgroundColor: green,
    rollBackgroundColor: pink,
    corner: 0 }).

  pos(0, 100, CENTER, CENTER).
  removeFrom().
  tap(function () {
    replay.removeFrom();

    // restarting is always tricky
    // you could just use zgo("matchingGame.html")
    objects.loop(function (obj) {
      obj.animate({
        props: { x: obj.startX, y: obj.startY },
        time: 700,
        ease: "backOut",
        call: function () {
          obj.mouse(); // add mouse control back
        } });

    });
    shuffle(targetsList); // otherwise are all good and won't shuffle!
    shuffleTargets();
    targets.removeFrom();
    STYLE = { clone: false }; // IMPORTANT as STYLE was turned off
    // or we could add clone false to Tile as we make it
    // but we DO NOT want to clone because our match property would be lost
    targets = new Tile(series(targetsList), 3, 1, 100).
    pos(0, 180, CENTER).
    alp(0).
    bot().
    ord(1) // above backing stripes
    .animate({
      wait: 1000,
      props: { alpha: 1 } });

    stage.update();
  });

  new Label("ZIM Matching Game").alp(.8).pos(40, 40);


  stage.update(); // this is needed to show any changes

  // DOCS FOR ITEMS USED
  // http://zimjs.com/docs.html?item=frame

  // FOOTER
  // call remote script to make ZIM icon - you will not need this
  createIcon();

}); // end of ready