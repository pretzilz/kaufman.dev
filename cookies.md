---
layout: page
title: cookies
permalink: /cookies/
---

<!-- <script src="{{ base.url | prepend: site.url }}/scripts/aws-sdk-2.713.0.min.js"></script> -->
<!-- <script src="{{ base.url | prepend: site.url }}/scripts/cookies.js"></script> -->

<table>
  {% for row in site.data.cookies %}
    {% if forloop.first %}
    <tr>
      {% for pair in row %}
        <th>{{ pair[0] }}</th>
      {% endfor %}
    </tr>
    {% endif %}

    {% tablerow pair in row %}
      {{ pair[1] }}
    {% endtablerow %}
  {% endfor %}
</table>
[back]({% link index.md %})