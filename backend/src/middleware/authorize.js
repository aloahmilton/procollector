export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized. Please login to access this resource.'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `Forbidden. This action requires one of the following roles: ${allowedRoles.join(', ')}. Your role: ${req.user.role}`
            });
        }

        next();
    };
};

export const authorizeOrganization = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized. Please login to access this resource.'
        });
    }

    // Extract organization ID from request params or body
    const targetOrgId = req.params.organizationId || req.body.organizationId;

    // Admin can access all organizations
    if (req.user.role === 'admin') {
        return next();
    }

    // Other users can only access their own organization
    if (req.user.organizationId !== targetOrgId) {
        return res.status(403).json({
            success: false,
            error: 'Forbidden. You can only access resources from your own organization.'
        });
    }

    next();
};

export const authorizeSelf = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized. Please login to access this resource.'
        });
    }

    const targetUserId = req.params.userId || req.params.id;

    // Admin can access all users
    if (req.user.role === 'admin') {
        return next();
    }

    // Users can only access their own data
    if (req.user.id !== targetUserId) {
        return res.status(403).json({
            success: false,
            error: 'Forbidden. You can only access your own data.'
        });
    }

    next();
};
