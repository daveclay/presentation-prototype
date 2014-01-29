(function() {

    function div(id, cssClasses) {
        var elem = $('<div/>');
        if (id) {
            elem.attr("id", id);
        }
        if (cssClasses) {
            elem.addClass(cssClasses);
        }
        return elem;
    }

    function stepDiv(id, cssClasses) {
        if (cssClasses) {
            return div(id, "step " + cssClasses);
        } else {
            return div(id, "step");
        }
    }

    function Vec3(_x, _y, _z) {
        var self = this;
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    function Vec3Elem(attributePrefix, _x, _y, _z) {
        var self = $.extend(this, new Vec3(_x, _y, _z));

        this.apply = function(elem) {
            if (this.x != null) {
                elem.attr(attributePrefix + "-x", this.x);
            }
            if (this.y != null){
                elem.attr(attributePrefix + "-y", this.y);
            }
            if (this.z != null) {
                elem.attr(attributePrefix + "-z", this.z);
            }
        }
    }

    function Rotation(_x, _y, _z) {
        var self = $.extend(this, new Vec3Elem("data-rotate", _x, _y, _z));
    }

    function Position(_x, _y, _z) {
        var self = $.extend(this, new Vec3Elem("data", _x, _y, _z));
    }

    // <div id="tiny" class="step" data-x="2825" data-y="2325" data-z="-3000" data-rotate="300" data-scale="1">
    function Slide(_id) {
        var self = this;

        var id = _id;
        var position = new Position();
        var rotation = new Rotation();
        var scale = 1;

        this.getID = function() {
            return id;
        };

        this.createUIElement = function() {
            var uiElem = stepDiv(id);
            uiElem.text("hi there.");
            position.apply(uiElem);
            rotation.apply(uiElem);
            return uiElem;
        };

        this.setPosition = function(_position) {
            position = _position;
        };

        this.setPosition = function(x, y, z) {
            position.x = x;
            position.y = y;
            position.z = z;
        };

        this.getPosition = function() {
            return position;
        };

        this.setRotation = function(_rotation) {
            rotation = _rotation;
        };

        this.setRotation = function(x, y, z) {
            rotation.x = x;
            rotation.y = y;
            rotation.z = z;
        };

        this.getRotation = function() {
            return rotation;
        }
    }

    function Presentation() {
        var self = this;

        var slides = [];

        this.createUIElement = function() {
            var elem = div("impress");

            $.each(slides, function(idx, slide) {
                var slideElem = slide.createUIElement();
                elem.append(slideElem);
            });

            return elem;
        };

        this.addSlide = function(slide) {
            slides.push(slide);
        };

        this.getSlides = function() {
            return slides;
        };

        this.getSlideAt = function(index) {
            return slides[index];
        };
    }

    $(document).ready(function() {
        var body = $('body');

        var presentation = new Presentation();

        var slide = new Slide("test");
        slide.setPosition(10, 10, 0);
        presentation.addSlide(slide);

        slide = new Slide("test2");
        slide.setPosition(100, 80, 300);
        slide.setRotation(0, 0, 180);
        presentation.addSlide(slide);
        //alert(presentation.getSlideAt(0).getPosition().y);

        var elem = presentation.createUIElement();
        body.append(elem);

        impress().init();
    });

})();
