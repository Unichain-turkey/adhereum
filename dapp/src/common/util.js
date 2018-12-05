export default class GeneralUtil {
  static validateLink = (link) => {
    if (!link.includes("http") && !link.includes("http")) {
      return 'https://' + link
    }

  }
}
