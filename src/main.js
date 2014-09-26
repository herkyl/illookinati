var illookinati = function (options) {
  if (!options.target) throw new Error('You must define a target');
  options = options || {};
  var vector,
      rect = options.target.getBoundingClientRect(),
      CENTER = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
  
  options.targetPerspective = options.targetPerspective || '800px';
  options.max = options.max || 30;
  options.target.style.transition = '0.1s';
  options.target.style.transformStyle = 'preserve-3d';
  options.target.style.transformOrigin = 'center center';
  
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove);

  function onMove(event) {
    event.preventDefault();
    var x = event.clientX || event.originalEvent.touches[0].pageX,
        y = event.clientY || event.originalEvent.touches[0].pageY;
    vector = getUnitVector(x, y);
    window.requestAnimationFrame(updateDOM);
  }
  
  function getUnitVector(x, y) {
    var vector,
        length;
    
    vector = {
      x: (CENTER.x - x) * -1,
      y: CENTER.y - y
    };
    
    length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    
    return {
      x: vector.x / length,
      y: vector.y / length
    };
  }

  function updateDOM() {
    options.target.style.transform = 
      'perspective(' + options.targetPerspective + ') ' +
      'rotateX(' + Math.round(vector.y * options.max) + 'deg) ' +
      'rotateY(' + Math.round(vector.x * options.max) + 'deg)';
  }
};
