var illookinati = function (options) {

  if (!options.target) throw new Error('You must define a target');
  options = options || {};

  var vector,
      rect = options.target.getBoundingClientRect(),
      isWebkit = 'WebkitAppearance' in document.documentElement.style,
      center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
  options.targetPerspective = options.targetPerspective || '800px';
  options.max = options.max || 30;
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
    vector = getUnitVector(x, y);
    window.requestAnimationFrame(updateDOM);
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
      'rotateX(' + Math.round(vector.y * options.max) + 'deg) ' +
      'rotateY(' + Math.round(vector.x * options.max) + 'deg)';
    options.target.style.transform = transform;
    options.target.style.webkitTransform = transform;
  }

};
