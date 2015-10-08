#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
weaveR <- function(message, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'weaveR',
    x,
    width = width,
    height = height,
    package = 'weaveR'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
weaveROutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'weaveR', width, height, package = 'weaveR')
}

#' Widget render function for use in Shiny
#'
#' @export
renderWeaveR <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, weaveROutput, env, quoted = TRUE)
}
