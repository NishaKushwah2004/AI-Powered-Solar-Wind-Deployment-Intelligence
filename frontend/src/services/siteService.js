import {
    getSites,
    getSite,
    createSite,
    updateSite,
    deleteSite,
} from "../api/sites/siteApi";

class SiteService {

    async getAllSites() {
        return await getSites();
    }

    async getSiteById(id) {
        return await getSite(id);
    }

    async createSite(site) {
        return await createSite(site);
    }

    async updateSite(id, site) {
        return await updateSite(id, site);
    }

    async deleteSite(id) {
        return await deleteSite(id);
    }

}

export default new SiteService();