clean = true;

function context(description, spec) {
  describe(description, spec);
};

var Helper = {
  init: function() {
  }, _checks: function(tag, data) {
    var type   = $(tag)[0].type,
        single = tag.indexOf(' />') !== -1;

    if (data.checked) {
      if (type === 'checkbox') {
        tag = tag.replace(' />', ' checked="checked" />');
      } else {
        $.error('You can check just checkbox element!');
      }
    } else if (data.selected) {
      if (type === 'radio') {
        tag = tag.replace(' />', ' selected="selected" />');
      } else if (tag.indexOf('<option') !== -1) {
        tag = tag.replace('>', ' selected="selected">');
      } else {
        $.error('You can select just radio and option element!');
      }
    }

    return tag;
  }, _data: function(options) {
    options = options || {};

    var times      = Helper._getTimes(options),
        html       = Helper._getHtml(options),
        checked    = Helper._getChecked(options),
        selected   = Helper._getSelected(options),
        opt        = Helper._normalize(options),
        attributes = Helper._parameterize(opt);

    return { attributes: attributes, html: html, checked: checked, selected: selected, times: times };
  }, _getChecked: function(options) {
    return options.checked || false;
  }, _getHtml: function(options) {
    var html    = options.html || '',
        content = '';

    if (typeof html === 'object') {
      for (var i = 0; i < html.length; i++) {
        content += html[i];
      }
    } else {
      content = html;
    }

    return content;
  }, _getSelected: function(options) {
    return options.selected || false;
  }, _getTimes: function(options) {
    return options.times || 1;
  }, _normalize: function(options) {
    delete options.times;
    delete options.html;
    delete options.selected;
    delete options.checked;

    return options;
  }, _parameterize: function(options) {
    var content = '';

    for (var option in options) {
      content += option + '="' + options[option] + '" ';
    }

    return content.replace(/\s$/, '');
  }, _repeat: function(tag, data) {
    var html = '';

    for (var i = 0; i < data.times; i++) {
      html += Helper._checks(tag, data);
    }

    return html;
  }, _verify: function(options) {
    if (options.type) {
      $.error('You cannot set the "type" using an alias!');
    }
  }, append: function(html) {
    $('.fixtury').append(html);
  }, checkbox: function(options) {
    Helper._verify(options);

    options['type'] = 'checkbox';

    return Helper.input(options);
  }, clear: function() {
    if (clean) {
      $('.fixtury').empty();
    }
  }, double: function(options, name) {
    var data = Helper._data(options),
        tag  = '<' + name + ' ' + data.attributes + '>' + data.html + '</' + name + '>';

    return Helper._repeat(tag.replace(' >', '>'), data);
  }, form: function(options) {
    return Helper.double(options, 'form');
  }, input: function(options) {
    return Helper.single(options, 'input');
  }, option: function(options) {
    return Helper.double(options, 'option');
  }, radio: function(options) {
    Helper._verify(options);

    options['type'] = 'radio';

    return Helper.input(options);
  }, select: function(options) {
    return Helper.double(options, 'select');
  }, single: function(options, name) {
    var data = Helper._data(options),
        tag  = '<' + name + ' ' + data.attributes + ' />';

    return Helper._repeat(tag.replace('  />', ' />'), data);
  }, radio: function(options) {
    Helper._verify(options);

    options['type'] = 'radio';

    return Helper.input(options);
  }, text: function(options) {
    Helper._verify(options);

    options['type'] = 'text';

    return Helper.input(options);
  }
};