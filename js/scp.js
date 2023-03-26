$(document).ready(function() {
$('#django_img').tilt({
  maxTilt:        20,
  perspective:    1000,   // efeito de perspectiva
  easing:         "cubic-bezier(.03,.98,.52,.99)",  // easing
  scale:          1.05,   // escala em hover
  speed:          300,    // velocidade do efeito
  glare:          false,  // brilho em hover
  "max-glare":    0.5     // intensidade do brilho
});

$('#bot_img').tilt({
    maxTilt:        20,
    perspective:    1000,   // efeito de perspectiva
    easing:         "cubic-bezier(.03,.98,.52,.99)",  // easing
    scale:          1.05,   // escala em hover
    speed:          300,    // velocidade do efeito
    glare:          false,  // brilho em hover
    "max-glare":    0.5     // intensidade do brilho
  });
  $('#scoreboard_img').tilt({
    maxTilt:        20,
    perspective:    1000,   // efeito de perspectiva
    easing:         "cubic-bezier(.03,.98,.52,.99)",  // easing
    scale:          1.05,   // escala em hover
    speed:          300,    // velocidade do efeito
    glare:          false,  // brilho em hover
    "max-glare":    0.5     // intensidade do brilho
  });
});