import CMS from 'netlify-cms';

import BlogPostPreview from './preview-templates/BlogPostPreview';
import ProjectPreview from './preview-templates/ProjectPreview';

CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('projects', ProjectPreview);
