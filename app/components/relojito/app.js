(function() {
    'use strict';

    angular
        .module('relojitoDirective', []);
})();



(function() {
    'use strict';

    angular
        .module('relojitoDirective')
        .directive('relojitoDirective', directive);


    function directive() {
        var directive = {
            restrict: 'E',
            templateUrl: '/app/components/relojito/relojito.template.html',
            scope: {
                percent: '=',
                size: '@',
                lineWidth : '@',
                rotate: '@',
                image: '@'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true

        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

          //console.log(el);//obtengo htrml
          var colour=null;
          if(ctrl.options.percent >= 75){
            colour = "red";
          }
          else if (ctrl.options.percent<25) {
            colour="green";
          }
          else if (ctrl.options.percent >= 25 && ctrl.options.percent < 50) {
            colour="yellow";
          }
          else if (ctrl.options.percent >= 50 && ctrl.options.percent < 75) {
            colour="orange";
          }
          else{
            colour="black";
          }


          el.append("<canvas></canvas>");
          var canvas = el.find("canvas")[0];
          var ctx = canvas.getContext('2d');
          canvas.height = 1.2 * ctrl.options.size;
          canvas.width = 1.2 * ctrl.options.size

          ctx.mozImageSmoothingEnabled = true;
          ctx.webkitImageSmoothingEnabled = true;
          ctx.msImageSmoothingEnabled = true;
          ctx.imageSmoothingEnabled = true;


          var imageObj = new Image();
          imageObj.onload = function() {
            ctx.drawImage(imageObj, -ctrl.options.size / 2, -ctrl.options.size / 2 );
          };
          imageObj.src = ctrl.options.image;

          ctx.translate(canvas.height / 2,   canvas.width / 2); // change center




          ctx.rotate((-1 / 2 + ctrl.options.rotate / 180) * Math.PI); // rotate -90 deg

          var radius = (ctrl.options.size -10 - ctrl.options.lineWidth) / 2;

          var percent = Math.min(Math.max(0, ctrl.options.percent || 1), 1);

          ctx.beginPath();
          ctx.strokeStyle=colour;
          ctx.moveTo(0, 0);               // Create a starting point
          ctx.arc(0,0,radius,0*Math.PI, (ctrl.options.percent*2*Math.PI)/100);
          ctx.lineTo(0, 0);             // Continue with vertical line
          ctx.fillStyle = colour;

          ctx.fill();


          ctx.stroke();                     // Draw it
          ctrl.el = el;




        }
    }

    Controller.$inject = ['$scope', 'cardSyncFactory'];


    function Controller($scope, cardSyncFactory) {


        var vm = this;

        vm.options = {
            percent:  vm.percent || 25,
            size: vm.size || 220,
            lineWidth: vm.lineWidth || 15,
            rotate: vm.rotate || 0,
            image: vm.image
        }

        //activate();

        function activate() {

        }
    }
})();
