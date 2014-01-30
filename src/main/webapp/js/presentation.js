(function() {

    var elementFactory = (function() {
        function ElemBuilder() {
            var id = null;
            var css = null;

            this.id = function(_id) {
                id = _id;
                return this;
            };

            this.css = function(_css) {
                css = _css;
                return this;
            };

            this.stepDiv = function() {
                if (css == null) {
                    this.css("step");
                } else {
                    this.css("step " + this.css);
                }
                return this.div();
            };

            this.div = function() {
                return this.createElem('div');
            };

            this.span = function() {
                return this.createElem('span');
            };

            this.createElem = function(name) {
                var elem = $('<' + name + "'/>");
                this.addAttributes(elem);
                return elem;
            };

            this.addAttributes = function(elem) {
                if (id) {
                    elem.attr("id", id);
                }
                if (css) {
                    elem.addClass(css);
                }
            };
        }

        return function() {
            return new ElemBuilder();
        };
    })();

    function div(id, cssClasses) {
        return elementFactory().id(id).css(cssClasses).div();
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
            var uiElem = elementFactory().id(id).stepDiv();
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
            var elem = elementFactory().id("impress").div();

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

    function Explosion(numberOfSprites) {
        var sprites = [];
        for (var i = 0; i < numberOfSprites; i++) {
            sprites[i] = new Sprite();
        }

        this.createUIElement = function() {
            var div = elementFactory().css("explosion").div();
            $.each(sprites, function(index, sprite) {
                var elem = sprite.createUIElement();
                div.append(elem);
            });
            return div;
        };
    }

    function Sprite() {

        this.createUIElement = function() {
            var div = elementFactory().css("sprite").div();
            div.text("+");
            return div;
        }
    }

    $(document).ready(function() {
        var body = $('body');

        var presentation = new Presentation();

        var slide = new Slide("test");
        slide.setPosition(10, 10, -800);
        presentation.addSlide(slide);

        slide = new Slide("test2");
        slide.setPosition(100, 80, 600);
        slide.setRotation(0, 0, 180);
        presentation.addSlide(slide);

        var elem = presentation.createUIElement();
        body.append(elem);

        impress().init();
    });

})();
