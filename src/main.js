var illookinati = function (options) {

  if (!options.target) throw new Error('You must define a target');
  options = options || {};

  var vector,
      unitDistance = 1,
      rect = options.target.getBoundingClientRect(),
      isWebkit = 'WebkitAppearance' in document.documentElement.style,
      center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
  options.targetPerspective = options.targetPerspective || '800px';
  options.max = options.max || 30;
  options.useDistance = options.useDistance || false;
  options.target.style.transformStyle = 'preserve-3d';
  options.target.style.transformOrigin = 'center center';
  if (isWebkit) { // Other browsers lag with this
    options.target.style.transition = '0.1s';
  }
  
  document.addEventListener('mousemove', onMove);

  function onMove(event) {
    event.preventDefault();
    var x = event.clientX,
        y = event.clientY;
    unitVector = getUnitVector(x, y);
    if (options.useDistance) {
      unitDistance = getUnitDistance(x, y);
    }
    window.requestAnimationFrame(updateDOM);
  }
  
  function getUnitDistance(x, y) {
    var dist = {
      x: Math.abs(center.x - x),
      y: Math.abs(center.y - y)
    };

    return 2 * Math.sqrt(dist.x * dist.x + dist.y * dist.y) / window.innerWidth;
  }

  function getUnitVector(x, y) {
    var vector,
        length;
    
    vector = {
      x: (center.x - x) * -1,
      y: center.y - y
    };
    
    length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    
    return {
      x: vector.x / length,
      y: vector.y / length
    };
  }

  function updateDOM() {
    var transform =
      'perspective(' + options.targetPerspective + ') ' +
      'rotateX(' + Math.round(unitVector.y * options.max * (unitDistance || 1)) + 'deg) ' +
      'rotateY(' + Math.round(unitVector.x * options.max * (unitDistance || 1)) + 'deg)';
    options.target.style.transform = transform;
    options.target.style.webkitTransform = transform;
  }

};
