$(document).ready(function() {

    $('.gallery').each(function() {
        const curGallery = $(this);
        const swiper = new Swiper(curGallery.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
        });
    });

    $('body').on('click', '.window-link', function(e) {
        const curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+\d \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('click', '.form-input-password-view', function(e) {
        const curField = $(this).parent();
        if (curField.find('input').attr('type') == 'password') {
            curField.find('input').attr('type', 'text');
            curField.addClass('password-view');
        } else {
            curField.find('input').attr('type', 'password');
            curField.removeClass('password-view');
        }
        e.preventDefault();
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-input span').html(curName);
        } else {
            curField.find('.form-file-input span').html(curField.find('.form-file-input').attr('data-placeholder'));
        }
    });

    $('.form-files').each(function() {
        var curFiles = $(this);
        if (curFiles.find('.form-files-list-item').length > 0) {
            curFiles.addClass('full');
            curFiles.find('.files-required').val('true');
        }
    });

    $('body').on('click', '.form-files-list-item-remove', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        $.ajax({
            type: 'GET',
            url: curLink.attr('href'),
            dataType: 'json',
            cache: false
        }).done(function(data) {
            curLink.parent().remove();
            if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
                curFiles.removeClass('full');
                curFiles.find('.files-required').val('');
            }
        });
        e.preventDefault();
    });

    $('body').on('click', '.form-files-list-item-cancel', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        curLink.parent().remove();
        if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
            curFiles.removeClass('full');
            curFiles.find('.files-required').val('');
        }
        e.preventDefault();
    });

    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });

    $(document).bind('dragover', function (e) {
        var dropZones = $('.form-files-dropzone'),
            timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        } else {
            dropZones.addClass('in');
        }
        var hoveredDropZone = $(e.target).closest(dropZones);
        dropZones.not(hoveredDropZone).removeClass('hover');
        hoveredDropZone.addClass('hover');
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZones.removeClass('in hover');
        }, 100);
    });

    $('body').on('click', '.form-files-dropzone', function(e) {
        var curLink = $(this);
        var curFiles = $(this).parents().filter('.form-files');
        curFiles.find('.form-files-input input').click();
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.mobile-menu-link a').click(function(e) {
        if ($('html').hasClass('menu-mobile-open')) {
            $('html').removeClass('menu-mobile-open');
            if ($(window).width() < 1200) {
                $('meta[name="viewport"]').attr('content', 'width=device-width');
                $(window).scrollTop($('html').data('scrollTop'));
            }
        } else {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-mobile-open');
            if ($(window).width() < 1200) {
                $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
                $('html').data('scrollTop', curScroll);
            }
        }
        e.preventDefault();
    });

    initCataloguePreview();

    $('body').on('mouseenter', '.catalogue-item-preview-tab', function() {
        const curSlide = $(this);
        const curPreview = curSlide.parents().filter('.catalogue-item-preview');
        const curIndex = curPreview.find('.catalogue-item-preview-tab').index(curSlide);
        curPreview.find('.catalogue-item-preview-slide.active').removeClass('active');
        curPreview.find('.catalogue-item-preview-slide').eq(curIndex).addClass('active');
        curPreview.find('.catalogue-item-preview-dot.active').removeClass('active');
        curPreview.find('.catalogue-item-preview-dot').eq(curIndex).addClass('active');
    });

    $('.main-catalogue').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.main-category-list').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.main-articles-list').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.main-why-mini').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.catalogue-card-gallery').each(function() {
        const thumbsSlider = $('.catalogue-card-gallery-preview')
        const thumbsSwiper = new Swiper(thumbsSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            spaceBetween: 10,
            direction: 'vertical',
            mousewheel: true,
            freeMode: true,
            on: {
                init: function() {
                    thumbsSlider.addClass('with-bottom');
                },
                sliderMove: function() {
                    if (thumbsSwiper.progress > 0) {
                        thumbsSlider.addClass('with-top');
                    } else {
                        thumbsSlider.removeClass('with-top');
                    }
                    if (thumbsSwiper.progress >= 1) {
                        thumbsSlider.removeClass('with-bottom');
                    } else {
                        thumbsSlider.addClass('with-bottom');
                    }
                },
                transitionEnd: function() {
                    if (thumbsSwiper.progress > 0) {
                        thumbsSlider.addClass('with-top');
                    } else {
                        thumbsSlider.removeClass('with-top');
                    }
                    if (thumbsSwiper.progress >= 1) {
                        thumbsSlider.removeClass('with-bottom');
                    } else {
                        thumbsSlider.addClass('with-bottom');
                    }
                }
            }
        });

        const bigSlider = $('.catalogue-card-gallery-big')
        const bigSwiper = new Swiper(bigSlider.find('.swiper')[0], {
            navigation: {
                prevEl: bigSlider.find('.swiper-button-prev')[0],
                nextEl: bigSlider.find('.swiper-button-next')[0]
            },
            pagination: {
                el: bigSlider.find('.swiper-pagination')[0],
                clickable: true
            },
            thumbs: {
                swiper: thumbsSwiper,
            },
            on: {
                afterInit: function () {
                    $('.catalogue-card-gallery-preview a').eq(0).addClass('active');
                },
                slideChange: function () {
                    $('.catalogue-card-gallery-preview a.active').removeClass('active');
                    $('.catalogue-card-gallery-preview a').eq(bigSwiper.activeIndex).addClass('active');
                },
            },
        });

        $('.catalogue-card-gallery-preview a').on('click', function(e) {
            const curItem = $(this);
            const curIndex = $('.catalogue-card-gallery-preview a').index(curItem);
            bigSwiper.slideTo(curIndex);
            $('.catalogue-card-gallery-preview a.active').removeClass('active');
            curItem.addClass('active');
            e.preventDefault();
        });

    });

    $('.catalogue-card-add').each(function() {
        let menuHTML =  '<div class="swiper"><div class="swiper-wrapper"><div class="swiper-slide"><div class="catalogue-card-add-menu-inner">';
        $('.catalogue-card-add-tab').each(function() {
            menuHTML += '<a href="#">' + $(this).attr('data-title') + '</a>';
        });
        menuHTML +=     '</div></div></div></div>';
        $('.catalogue-card-add-menu').html(menuHTML);
        $('.catalogue-card-add-menu-inner a').eq(0).addClass('active');
        $('.catalogue-card-add-tab').eq(0).addClass('active');

        $('.catalogue-card-add-menu').each(function() {
            const curSlider = $(this);
            new Swiper(curSlider.find('.swiper')[0], {
                slidesPerView: 'auto',
                freeMode: true,
            });
        });
    });

    $('body').on('click', '.catalogue-card-add-menu-inner a', function(e) {
        const curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.catalogue-card-add-menu-inner a.active').removeClass('active');
            curLink.addClass('active');
            const curIndex = $('.catalogue-card-add-menu-inner a').index(curLink);
            $('.catalogue-card-add-tab.active').removeClass('active');
            $('.catalogue-card-add-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.faq-item-title').click(function(e) {
        const curItem = $(this).parent();
        curItem.toggleClass('open');
        curItem.find('.faq-item-text').slideToggle();
        e.preventDefault();
    });

    $('.catalogue-guarantee-more a').click(function(e) {
        const curBlock = $(this).parents().filter('.catalogue-guarantee');
        curBlock.toggleClass('open');
        e.preventDefault();
    });

    $('.catalogue-others-catalogue').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: 'auto',
            freeMode: true,
        });
    });

    $('.cookies-message-close').click(function(e) {
        $('.cookies-message').fadeOut(500);
        e.preventDefault();
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.main-welcome').each(function() {
        const curSlider = $(this);
        new Swiper(curSlider.find('.swiper')[0], {
            slidesPerView: '1',
            loop: true,
            navigation: {
                prevEl: curSlider.find('.swiper-button-prev')[0],
                nextEl: curSlider.find('.swiper-button-next')[0]
            },
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true
            },
        });
    });

    $('.page-size-current').click(function() {
        const curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
            $('html').removeClass('page-size-open');
        } else {
            curSelect.addClass('open');
            $('html').addClass('page-size-open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.page-size-select').length == 0) {
            $('.page-size-select').removeClass('open');
            $('html').removeClass('page-size-open');
        }
    });

    $('.page-size-item').click(function() {
        const curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.page-size-current span').html(curItem.html());
            $('.page-size-item.active').removeClass('active');
            curItem.addClass('active');
        }
        $('.page-size-select').removeClass('open');
        $('html').removeClass('page-size-open');
    });

    $('.catalogue-filter-param-title').click(function() {
        const curParam = $(this).parent();
        if (curParam.hasClass('open')) {
            curParam.removeClass('open');
        } else {
            $('.catalogue-filter-param.open').removeClass('open');
            curParam.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-filter-param').length == 0) {
            $('.catalogue-filter-param').removeClass('open');
        }
    });

    $('.catalogue-filter-param-item input').change(function() {
        const curParam = $(this).parents().filter('.catalogue-filter-param');
        const countChecked = curParam.find('.catalogue-filter-param-item input:checked').length;
        if (countChecked) {
            curParam.addClass('active');
            curParam.find('.catalogue-filter-param-title-count').html(countChecked);
        } else {
            curParam.removeClass('active');
        }
        checkCatalogueFilter();
    });

    $('.catalogue-filter-param-title-remove').click(function() {
        const curParam = $(this).parents().filter('.catalogue-filter-param');
        if (curParam.find('.catalogue-filter-param-list').length == 1) {
            curParam.find('.catalogue-filter-param-item input:checked').prop('checked', false);
            curParam.removeClass('active');
        }
        checkCatalogueFilter();
    });

    $('.catalogue-filter-params-clear').click(function() {
        $('.catalogue-filter-param.active .catalogue-filter-param-title-remove').trigger('click');
    });

    $('.catalogue-sort-current').click(function() {
        const curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort-select').length == 0) {
            $('.catalogue-sort-select').removeClass('open');
        }
    });

    $('.catalogue-sort-item').click(function() {
        const curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.catalogue-sort-current span').html(curItem.html());
            $('.catalogue-sort-item.active').removeClass('active');
            curItem.addClass('active');
        }
        $('.catalogue-sort-select').removeClass('open');
    });

    $('.catalogue-filter-slider .form-slider').each(function() {
        const curSlider = $(this);
        const curRange = curSlider.find('.form-slider-range-inner')[0];
        let curStartFrom = Number(curSlider.find('.form-slider-min').html());
        if (Number(curSlider.find('.form-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.form-slider-from').val());
        }
        let curStartTo = Number(curSlider.find('.form-slider-max').html());
        if (Number(curSlider.find('.form-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.form-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.form-slider-min').html()),
                'max': Number(curSlider.find('.form-slider-max').html())
            },
            step: Number(curSlider.find('.form-slider-step').html()),
            format: wNumb({
                decimals: 0,
                thousand: ' '
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.form-slider-from').val(values[handle]);
                curSlider.find('.form-slider-hints-from span').html(values[handle]);
                if (values[handle] == Number(curSlider.find('.form-slider-min').html())) {
                    curSlider.find('.form-slider-hints-from').removeClass('active');
                } else {
                    curSlider.find('.form-slider-hints-from').addClass('active');
                }
            } else {
                curSlider.find('.form-slider-to').val(values[handle]);
                curSlider.find('.form-slider-hints-to span').html(values[handle]);
                if (values[handle] == Number(curSlider.find('.form-slider-max').html())) {
                    curSlider.find('.form-slider-hints-to').removeClass('active');
                } else {
                    curSlider.find('.form-slider-hints-to').addClass('active');
                }
            }
        });
    });

});

function checkCatalogueFilter() {
    let countParams = 0;
    $('.catalogue-filter-param').each(function() {
        const curParam = $(this);
        if (curParam.find('.catalogue-filter-param-item input:checked').length > 0) {
            countParams++;
        }
    });
    if (countParams) {
        $('.catalogue-filter-params-count').addClass('visible');
        $('.catalogue-filter-params-clear').addClass('visible');
    } else {
        $('.catalogue-filter-params-count').removeClass('visible');
        $('.catalogue-filter-params-clear').removeClass('visible');
    }
}

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+0 (000) 000-00-00');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.find('.form-files').each(function() {
        var curFiles = $(this);
        var curInput = curFiles.find('.form-files-input input');

        var uploadURL = curInput.attr('data-uploadurl');
        var uploadFiles = curInput.attr('data-uploadfiles');
        var removeURL = curInput.attr('data-removeurl');
        curInput.fileupload({
            url: uploadURL,
            dataType: 'json',
            dropZone: curFiles.find('.form-files-dropzone'),
            pasteZone: curFiles.find('.form-files-dropzone'),
            add: function(e, data) {
                if (typeof curInput.attr('multiple') !== 'undefined') {
                    curFiles.find('.form-files-list').append('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48077 15.3743C5.10674 15.3743 4.78727 15.2419 4.52237 14.977C4.25746 14.7121 4.125 14.3926 4.125 14.0186V4.49937H3.375V3.37439H6.74998V2.71094H11.25V3.37439H14.625V4.49937H13.875V14.0186C13.875 14.3974 13.7437 14.7181 13.4812 14.9806C13.2187 15.2431 12.898 15.3743 12.5192 15.3743H5.48077ZM12.75 4.49937H5.24998V14.0186C5.24998 14.0859 5.27162 14.1412 5.31489 14.1845C5.35817 14.2277 5.41346 14.2494 5.48077 14.2494H12.5192C12.5769 14.2494 12.6298 14.2253 12.6779 14.1773C12.7259 14.1292 12.75 14.0763 12.75 14.0186V4.49937ZM7.05289 12.7494H8.17787V5.99937H7.05289V12.7494ZM9.82209 12.7494H10.9471V5.99937H9.82209V12.7494Z" /></svg></span></div>');
                } else {
                    curFiles.find('.form-files-list').html('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48077 15.3743C5.10674 15.3743 4.78727 15.2419 4.52237 14.977C4.25746 14.7121 4.125 14.3926 4.125 14.0186V4.49937H3.375V3.37439H6.74998V2.71094H11.25V3.37439H14.625V4.49937H13.875V14.0186C13.875 14.3974 13.7437 14.7181 13.4812 14.9806C13.2187 15.2431 12.898 15.3743 12.5192 15.3743H5.48077ZM12.75 4.49937H5.24998V14.0186C5.24998 14.0859 5.27162 14.1412 5.31489 14.1845C5.35817 14.2277 5.41346 14.2494 5.48077 14.2494H12.5192C12.5769 14.2494 12.6298 14.2253 12.6779 14.1773C12.7259 14.1292 12.75 14.0763 12.75 14.0186V4.49937ZM7.05289 12.7494H8.17787V5.99937H7.05289V12.7494ZM9.82209 12.7494H10.9471V5.99937H9.82209V12.7494Z" /></svg></span></div>');
                }
                data.submit();
                curFiles.addClass('full');
            },
            done: function (e, data) {
                curFiles.find('.form-files-list-item-progress').eq(0).remove();
                if (data.result.status == 'success') {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3077 21.5C5.80257 21.5 5.375 21.325 5.025 20.975C4.675 20.625 4.5 20.1974 4.5 19.6923V4.3077C4.5 3.80257 4.675 3.375 5.025 3.025C5.375 2.675 5.80257 2.5 6.3077 2.5H14.25L19.5 7.74995V19.6923C19.5 20.1974 19.325 20.625 18.975 20.975C18.625 21.325 18.1974 21.5 17.6922 21.5H6.3077ZM13.5 8.49995V3.99998H6.3077C6.23077 3.99998 6.16024 4.03203 6.09612 4.09613C6.03202 4.16024 5.99997 4.23077 5.99997 4.3077V19.6923C5.99997 19.7692 6.03202 19.8397 6.09612 19.9038C6.16024 19.9679 6.23077 20 6.3077 20H17.6922C17.7692 20 17.8397 19.9679 17.9038 19.9038C17.9679 19.8397 18 19.7692 18 19.6923V8.49995H13.5Z" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' Мб</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48077 15.3743C5.10674 15.3743 4.78727 15.2419 4.52237 14.977C4.25746 14.7121 4.125 14.3926 4.125 14.0186V4.49937H3.375V3.37439H6.74998V2.71094H11.25V3.37439H14.625V4.49937H13.875V14.0186C13.875 14.3974 13.7437 14.7181 13.4812 14.9806C13.2187 15.2431 12.898 15.3743 12.5192 15.3743H5.48077ZM12.75 4.49937H5.24998V14.0186C5.24998 14.0859 5.27162 14.1412 5.31489 14.1845C5.35817 14.2277 5.41346 14.2494 5.48077 14.2494H12.5192C12.5769 14.2494 12.6298 14.2253 12.6779 14.1773C12.7259 14.1292 12.75 14.0763 12.75 14.0186V4.49937ZM7.05289 12.7494H8.17787V5.99937H7.05289V12.7494ZM9.82209 12.7494H10.9471V5.99937H9.82209V12.7494Z" /></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3077 21.5C5.80257 21.5 5.375 21.325 5.025 20.975C4.675 20.625 4.5 20.1974 4.5 19.6923V4.3077C4.5 3.80257 4.675 3.375 5.025 3.025C5.375 2.675 5.80257 2.5 6.3077 2.5H14.25L19.5 7.74995V19.6923C19.5 20.1974 19.325 20.625 18.975 20.975C18.625 21.325 18.1974 21.5 17.6922 21.5H6.3077ZM13.5 8.49995V3.99998H6.3077C6.23077 3.99998 6.16024 4.03203 6.09612 4.09613C6.03202 4.16024 5.99997 4.23077 5.99997 4.3077V19.6923C5.99997 19.7692 6.03202 19.8397 6.09612 19.9038C6.16024 19.9679 6.23077 20 6.3077 20H17.6922C17.7692 20 17.8397 19.9679 17.9038 19.9038C17.9679 19.8397 18 19.7692 18 19.6923V8.49995H13.5Z" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' Мб</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48077 15.3743C5.10674 15.3743 4.78727 15.2419 4.52237 14.977C4.25746 14.7121 4.125 14.3926 4.125 14.0186V4.49937H3.375V3.37439H6.74998V2.71094H11.25V3.37439H14.625V4.49937H13.875V14.0186C13.875 14.3974 13.7437 14.7181 13.4812 14.9806C13.2187 15.2431 12.898 15.3743 12.5192 15.3743H5.48077ZM12.75 4.49937H5.24998V14.0186C5.24998 14.0859 5.27162 14.1412 5.31489 14.1845C5.35817 14.2277 5.41346 14.2494 5.48077 14.2494H12.5192C12.5769 14.2494 12.6298 14.2253 12.6779 14.1773C12.7259 14.1292 12.75 14.0763 12.75 14.0186V4.49937ZM7.05289 12.7494H8.17787V5.99937H7.05289V12.7494ZM9.82209 12.7494H10.9471V5.99937H9.82209V12.7494Z" /></svg></a></div>');
                    }
                    curFiles.find('.files-required').val('true');
                    curFiles.find('label.error').remove();
                } else {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3077 21.5C5.80257 21.5 5.375 21.325 5.025 20.975C4.675 20.625 4.5 20.1974 4.5 19.6923V4.3077C4.5 3.80257 4.675 3.375 5.025 3.025C5.375 2.675 5.80257 2.5 6.3077 2.5H14.25L19.5 7.74995V19.6923C19.5 20.1974 19.325 20.625 18.975 20.975C18.625 21.325 18.1974 21.5 17.6922 21.5H6.3077ZM13.5 8.49995V3.99998H6.3077C6.23077 3.99998 6.16024 4.03203 6.09612 4.09613C6.03202 4.16024 5.99997 4.23077 5.99997 4.3077V19.6923C5.99997 19.7692 6.03202 19.8397 6.09612 19.9038C6.16024 19.9679 6.23077 20 6.3077 20H17.6922C17.7692 20 17.8397 19.9679 17.9038 19.9038C17.9679 19.8397 18 19.7692 18 19.6923V8.49995H13.5Z" /></svg>></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name">' + data.result.path + '</div><div class="form-files-list-item-size">' + data.result.text + '</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48077 15.3743C5.10674 15.3743 4.78727 15.2419 4.52237 14.977C4.25746 14.7121 4.125 14.3926 4.125 14.0186V4.49937H3.375V3.37439H6.74998V2.71094H11.25V3.37439H14.625V4.49937H13.875V14.0186C13.875 14.3974 13.7437 14.7181 13.4812 14.9806C13.2187 15.2431 12.898 15.3743 12.5192 15.3743H5.48077ZM12.75 4.49937H5.24998V14.0186C5.24998 14.0859 5.27162 14.1412 5.31489 14.1845C5.35817 14.2277 5.41346 14.2494 5.48077 14.2494H12.5192C12.5769 14.2494 12.6298 14.2253 12.6779 14.1773C12.7259 14.1292 12.75 14.0763 12.75 14.0186V4.49937ZM7.05289 12.7494H8.17787V5.99937H7.05289V12.7494ZM9.82209 12.7494H10.9471V5.99937H9.82209V12.7494Z" /></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3077 21.5C5.80257 21.5 5.375 21.325 5.025 20.975C4.675 20.625 4.5 20.1974 4.5 19.6923V4.3077C4.5 3.80257 4.675 3.375 5.025 3.025C5.375 2.675 5.80257 2.5 6.3077 2.5H14.25L19.5 7.74995V19.6923C19.5 20.1974 19.325 20.625 18.975 20.975C18.625 21.325 18.1974 21.5 17.6922 21.5H6.3077ZM13.5 8.49995V3.99998H6.3077C6.23077 3.99998 6.16024 4.03203 6.09612 4.09613C6.03202 4.16024 5.99997 4.23077 5.99997 4.3077V19.6923C5.99997 19.7692 6.03202 19.8397 6.09612 19.9038C6.16024 19.9679 6.23077 20 6.3077 20H17.6922C17.7692 20 17.8397 19.9679 17.9038 19.9038C17.9679 19.8397 18 19.7692 18 19.6923V8.49995H13.5Z" /></svg>></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name">' + data.result.path + '</div><div class="form-files-list-item-size">' + data.result.text + '</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48077 15.3743C5.10674 15.3743 4.78727 15.2419 4.52237 14.977C4.25746 14.7121 4.125 14.3926 4.125 14.0186V4.49937H3.375V3.37439H6.74998V2.71094H11.25V3.37439H14.625V4.49937H13.875V14.0186C13.875 14.3974 13.7437 14.7181 13.4812 14.9806C13.2187 15.2431 12.898 15.3743 12.5192 15.3743H5.48077ZM12.75 4.49937H5.24998V14.0186C5.24998 14.0859 5.27162 14.1412 5.31489 14.1845C5.35817 14.2277 5.41346 14.2494 5.48077 14.2494H12.5192C12.5769 14.2494 12.6298 14.2253 12.6779 14.1773C12.7259 14.1292 12.75 14.0763 12.75 14.0186V4.49937ZM7.05289 12.7494H8.17787V5.99937H7.05289V12.7494ZM9.82209 12.7494H10.9471V5.99937H9.82209V12.7494Z" /></svg></a></div>');
                    }
                }
                curFiles.addClass('full');
            }
        });
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 10
        };
        if (typeof(curSelect.attr('data-searchplaceholder')) != 'undefined') {
            options['searchInputPlaceholder'] = curSelect.attr('data-searchplaceholder');
        }
        if (curForm.hasClass('clinics-ctrl')) {
            options['allowClear'] = true;
        }
        curSelect.select2(options);
        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            $(e.delegateTarget).parent().find('.select2-search--inline input').val('').trigger('input.search').trigger('focus');
            $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });
        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                $(e.delegateTarget).parent().find('.select2-container').removeClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-placeholder'));
            } else {
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            }
        });
        if (typeof(curSelect.attr('multiple')) != 'undefined') {
            curSelect.on('select2:open', function(e) {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            });
        }
        if (curSelect.find('option:selected').length > 0 && curSelect.find('option:selected').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.on('reset', function() {
        curForm.find('.form-files-list-item-remove').trigger('click');
        curForm.find('.form-select select').val(null).trigger('change');
    });

    curForm.validate({
        ignore: '',
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        let curPadding = $('.wrapper').width();
        const curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'padding-right': curPadding});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
        }
        $('.window .window-loading').remove();
        window.setTimeout(function() {
            $('.window-container').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        var isEmptyForm = true;
        $('.window:last .form-input input, .window:last .form-input textarea, .window:last .form-select select').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'padding-right': 0});
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
            windowClose();
        }
    }
}

function initCataloguePreview() {
    $('.catalogue-item-preview').each(function() {
        const curPreview = $(this);
        curPreview.find('.catalogue-item-preview-slides .catalogue-item-preview-slide').eq(0).addClass('active');
        const countSlides = curPreview.find('.catalogue-item-preview-slides .catalogue-item-preview-slide').length;
        if (countSlides > 1) {
            if (curPreview.find('.catalogue-item-preview-tabs').length == 0) {
                let htmlTabs =  '<div class="catalogue-item-preview-tabs">';
                let htmlDots =  '<div class="catalogue-item-preview-dots">';
                for (let i = 0; i < countSlides; i++) {
                    htmlTabs +=     '<div class="catalogue-item-preview-tab"></div>';
                    htmlDots +=     '<div class="catalogue-item-preview-dot"></div>';
                }
                htmlTabs +=     '</div>';
                htmlDots +=     '</div>';
                curPreview.append(htmlTabs + htmlDots);
                curPreview.find('.catalogue-item-preview-dot').eq(0).addClass('active');

                let htmlSlider =    '<div class="catalogue-item-preview-swiper swiper"><div class="swiper-wrapper">';
                for (let i = 0; i < countSlides; i++) {
                    htmlSlider +=       '<div class="swiper-slide">' + curPreview.find('.catalogue-item-preview-slides .catalogue-item-preview-slide').eq(i).html() + '</div>';
                }
                htmlSlider +=       '</div><div class="swiper-pagination"></div></div>';
                curPreview.append(htmlSlider);
                new Swiper(curPreview.find('.catalogue-item-preview-swiper')[0], {
                    loop: true,
                    touchAngle: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                });
            }
        }
    });
}

$(window).on('load', function() {
    $('.catalogue-guarantee').each(function() {
        const curBlock = $(this);
        if (curBlock.find('.catalogue-guarantee-container').outerHeight() < curBlock.find('.catalogue-guarantee-inner').outerHeight()) {
            curBlock.find('.catalogue-guarantee-more').addClass('visible');
        }
    });
});

$(window).on('load resize scroll', function() {
    const windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    const windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 0) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }
});
